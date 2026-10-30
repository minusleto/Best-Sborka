package bestsborka.machines.blockentity;

import bestsborka.machines.BSMachines;
import bestsborka.machines.container.AssemblerContainer;
import bestsborka.machines.init.ModBlocks;
import bestsborka.machines.recipes.AssemblerCosts;
import bestsborka.machines.recipes.MachineRecipes;
import ic2.api.recipes.ingridients.inputs.IInput;
import ic2.api.recipes.registries.IMachineRecipeList;
import ic2.api.util.DirectionList;
import ic2.core.block.base.tiles.impls.machine.single.BasicMachineTileEntity;
import ic2.core.inventory.base.IHasInventory;
import ic2.core.inventory.container.IC2Container;
import ic2.core.inventory.filter.SpecialFilters;
import ic2.core.inventory.filter.special.ElectricItemFilter;
import ic2.core.inventory.handler.AccessRule;
import ic2.core.inventory.handler.InventoryHandler;
import ic2.core.inventory.handler.SlotType;
import ic2.core.inventory.inv.RangedInventory;
import net.minecraft.core.BlockPos;
import net.minecraft.core.Direction;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraft.world.level.block.state.BlockState;

import java.util.function.Predicate;

/**
 * Assembler (Advanced Assembler from IC2Additions 1.12.2): up to 6 inputs, one output, a different EU cost per
 * recipe (see AssemblerCosts). Built on IC2C's BasicMachineTileEntity the same way IC2C's Mixing Furnace is,
 * with the two input slots generalised to six. Slots: 0 battery, 1..7 inputs (1,3,4,5,6,7), 2 output, 8..11 upgrades.
 */
public class BlockEntityAssembler extends BasicMachineTileEntity {
    public static final ResourceLocation TEXTURE = new ResourceLocation(BSMachines.MODID, "textures/gui/assembler.png");
    public static final int[] INPUTS = {1, 3, 4, 5, 6, 7};
    public static final int OUTPUT = 2;

    public BlockEntityAssembler(BlockPos pos, BlockState state) {
        // 8 slots (without upgrades), 32 EU/t, 400 ticks default (real length is set per recipe), max input 32 EU/t
        super(pos, state, 8, 32, 400, 32);
    }

    @Override
    public BlockEntityType<?> createType() {
        return ModBlocks.ASSEMBLER_TYPE;
    }

    @Override
    public BlockEntityType<?> getType() {
        return ModBlocks.ASSEMBLER_TYPE;
    }

    @Override
    public ResourceLocation getTexture() {
        return TEXTURE;
    }

    @Override
    public IMachineRecipeList getRecipeList() {
        return MachineRecipes.ASSEMBLER;
    }

    @Override
    public IC2Container createContainer(Player player, InteractionHand hand, Direction side, int windowID) {
        return new AssemblerContainer(this, player, windowID);
    }

    @Override
    protected void addSlotInfo(InventoryHandler handler) {
        handler.registerBlockSides(DirectionList.ALL);
        handler.registerBlockAccess(DirectionList.ALL, AccessRule.BOTH);
        handler.registerSlotAccess(AccessRule.IMPORT, INPUTS);
        handler.registerSlotAccess(AccessRule.BOTH, 0);
        handler.registerSlotAccess(AccessRule.EXPORT, OUTPUT);
        handler.registerSlotsForSide(DirectionList.DOWN.invert(), INPUTS);
        handler.registerSlotsForSide(DirectionList.UP.invert(), 0, OUTPUT);
        handler.registerInputFilter(SpecialFilters.createChargeFilter(), 0);
        handler.registerOutputFilter(ElectricItemFilter.NOT_DISCHARGE_FILTER, 0);
        handler.registerInputFilter(stack -> this.acceptsInput(stack), INPUTS);
        handler.registerInputFilter(SpecialFilters.ALWAYS_FALSE, OUTPUT);
        handler.registerNamedSlot(SlotType.BATTERY, 0);
        handler.registerNamedSlot(SlotType.INPUT, 1);
        handler.registerNamedSlot(SlotType.OUTPUT, OUTPUT);
        handler.registerNamedSlot(SlotType.EXTRA_INPUT, 3, 4, 5, 6, 7);
    }

    @Override
    protected void createInvCaches() {
        this.inOut = new IHasInventory[]{
                new RangedInventory(this, INPUTS),
                new RangedInventory(this, new int[]{OUTPUT}).setOutputOnly()
        };
    }

    /** True if the stack is an ingredient of at least one Assembler recipe. */
    public boolean acceptsInput(ItemStack stack) {
        if (stack.isEmpty()) {
            return false;
        }
        for (IMachineRecipeList.RecipeEntry entry : MachineRecipes.ASSEMBLER.getAllEntries()) {
            for (IInput input : entry.getInputs()) {
                if (input.matches(stack)) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public IMachineRecipeList.RecipeEntry getRecipe(int slot, ItemStack stack) {
        return this.getRecipeList().getRecipe((Predicate<IMachineRecipeList.RecipeEntry>) this::matchesRecipe);
    }

    protected boolean matchesRecipe(IMachineRecipeList.RecipeEntry entry) {
        return this.assign(entry.getInputs()) != null;
    }

    @Override
    protected RecipeResult isRecipeStillValid(int slot, IMachineRecipeList.RecipeEntry entry) {
        return this.matchesRecipe(entry) ? RecipeResult.SUCCESS : RecipeResult.FAIL;
    }

    @Override
    public void consumeInput(IInput[] inputs, int slot, boolean flag) {
        int[] assigned = this.assign(inputs);
        if (assigned == null) {
            return;
        }
        for (int i = 0; i < inputs.length; i++) {
            this.inventory.get(assigned[i]).shrink(inputs[i].getInputSize());
        }
    }

    @Override
    public int getValidRoom(ItemStack stack) {
        int room = 0;
        for (int slot : INPUTS) {
            ItemStack current = this.inventory.get(slot);
            if (current.isEmpty()) {
                room = Math.max(room, stack.getMaxStackSize());
            } else if (ItemStack.isSameItemSameTags(current, stack)) {
                room = Math.max(room, current.getMaxStackSize() - current.getCount());
            }
        }
        return room;
    }

    @Override
    protected void handleMods(int slot, IMachineRecipeList.RecipeEntry entry) {
        super.handleMods(slot, entry);
        if (entry == null) {
            return;
        }
        // Per-recipe EU cost: keep the speed ratio chosen by upgrades, set the length from the recipe cost.
        float ratio = this.defaultOperationLength == 0 ? 1.0F : (float) this.operationLength / this.defaultOperationLength;
        float perTick = Math.max(1, this.defaultEnergyConsume);
        this.operationLength = Math.max(1, Math.round(AssemblerCosts.get(entry) / perTick * ratio));
        this.recipeOperation = this.operationLength;
    }

    /** Finds distinct input slots for every recipe input (any order); null if the recipe cannot be filled. */
    private int[] assign(IInput[] inputs) {
        if (inputs.length == 0 || inputs.length > INPUTS.length) {
            return null;
        }
        int[] result = new int[inputs.length];
        return this.assignFrom(inputs, 0, result, 0) ? result : null;
    }

    private boolean assignFrom(IInput[] inputs, int index, int[] result, int usedMask) {
        if (index == inputs.length) {
            return true;
        }
        for (int i = 0; i < INPUTS.length; i++) {
            if ((usedMask & (1 << i)) != 0) {
                continue;
            }
            ItemStack stack = this.inventory.get(INPUTS[i]);
            if (!stack.isEmpty() && inputs[index].matches(stack) && stack.getCount() >= inputs[index].getInputSize()) {
                result[index] = INPUTS[i];
                if (this.assignFrom(inputs, index + 1, result, usedMask | (1 << i))) {
                    return true;
                }
            }
        }
        return false;
    }
}
