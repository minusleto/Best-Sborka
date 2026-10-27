package bestsborka.machines.blockentity;

import bestsborka.machines.container.MetalFormerContainer;
import bestsborka.machines.init.ModBlocks;
import bestsborka.machines.recipes.MachineRecipes;
import ic2.api.network.buffer.NetworkInfo;
import ic2.api.network.tile.INetworkClientEventListener;
import ic2.api.recipes.registries.IMachineRecipeList;
import ic2.core.block.base.tiles.impls.machine.single.BasicMachineTileEntity;
import ic2.core.inventory.container.IC2Container;
import ic2.core.platform.registries.IC2Sounds;
import net.minecraft.core.BlockPos;
import net.minecraft.core.Direction;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraft.world.level.block.state.BlockState;

/**
 * Metal Former (IC2 Experimental 1.12.2): one input, one output, three modes
 * selected with a GUI button: 0 = rolling, 1 = extruding, 2 = cutting.
 * Each mode has its own IC2 recipe list (see MachineRecipes), so recipes are data-driven.
 */
public class BlockEntityMetalFormer extends BasicMachineTileEntity implements INetworkClientEventListener {
    /** Reuses the IC2 Classic compressor GUI (same slot layout). */
    public static final ResourceLocation TEXTURE =
            new ResourceLocation("ic2", "textures/gui_sprites/blocks/machines/lv/gui_compressor.png");

    public static final int MODE_ROLLING = 0;
    public static final int MODE_EXTRUDING = 1;
    public static final int MODE_CUTTING = 2;
    public static final int MODE_COUNT = 3;
    public static final String[] MODE_NAMES = {"rolling", "extruding", "cutting"};

    /** Client button event id that cycles the mode. */
    public static final int EVENT_CYCLE_MODE = 1;

    @NetworkInfo
    public byte mode = MODE_ROLLING;

    public BlockEntityMetalFormer(BlockPos pos, BlockState state) {
        // 3 slots (battery, input, output), 10 EU/t, 200 ticks per operation, max input 32 EU/t (LV)
        super(pos, state, 3, 10, 200, 32);
        this.addGuiFields("mode");
    }

    @Override
    public BlockEntityType<?> createType() {
        return ModBlocks.METAL_FORMER_TYPE;
    }

    @Override
    public BlockEntityType<?> getType() {
        return ModBlocks.METAL_FORMER_TYPE;
    }

    @Override
    public IMachineRecipeList getRecipeList() {
        return MachineRecipes.getList(this.mode);
    }

    @Override
    public ResourceLocation getTexture() {
        return TEXTURE;
    }

    @Override
    protected ResourceLocation getWorkingSound() {
        return IC2Sounds.COMPRESSOR_PROCESSING;
    }

    @Override
    public IC2Container createContainer(Player player, InteractionHand hand, Direction side, int windowID) {
        return new MetalFormerContainer(this, player, windowID);
    }

    @Override
    public void onClientDataReceived(Player player, int key, int value) {
        if (key == EVENT_CYCLE_MODE) {
            this.cycleMode();
        }
        super.onClientDataReceived(player, key, value);
    }

    private void cycleMode() {
        this.mode = (byte) ((this.mode + 1) % MODE_COUNT);
        // The old recipe belongs to another mode's list: drop it and restart the operation.
        this.progress = 0.0F;
        this.usedRecipe = null;
        this.setLastRecipe(1, null);
        this.rebuildCache = true;
        this.updateGuiField("mode");
        this.updateGuiField("progress");
        this.addToTick();
        this.setChanged();
    }

    @Override
    public void load(CompoundTag compound) {
        super.load(compound);
        this.mode = (byte) Math.floorMod((int) compound.getByte("mode"), MODE_COUNT);
    }

    @Override
    public void saveAdditional(CompoundTag compound) {
        super.saveAdditional(compound);
        compound.putByte("mode", this.mode);
    }
}
