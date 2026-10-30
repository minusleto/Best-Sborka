package bestsborka.machines.jei;

import bestsborka.machines.BSMachines;
import bestsborka.machines.recipes.AssemblerCosts;
import com.mojang.blaze3d.vertex.PoseStack;
import ic2.api.recipes.ingridients.inputs.IInput;
import ic2.api.recipes.registries.IMachineRecipeList;
import mezz.jei.api.gui.builder.IRecipeLayoutBuilder;
import mezz.jei.api.gui.drawable.IDrawable;
import mezz.jei.api.gui.ingredient.IRecipeSlotsView;
import mezz.jei.api.helpers.IGuiHelper;
import mezz.jei.api.recipe.IFocusGroup;
import mezz.jei.api.recipe.RecipeIngredientRole;
import mezz.jei.api.recipe.RecipeType;
import mezz.jei.api.recipe.category.IRecipeCategory;
import net.minecraft.client.Minecraft;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.ItemLike;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/** JEI page of the Assembler: 6 input slots, output, and the EU cost written under the recipe. */
public class AssemblerCategory implements IRecipeCategory<IMachineRecipeList.RecipeEntry> {
    // The GUI texture region used as the background: (10,4) .. (140,52).
    private static final int U = 10, V = 4, W = 130, H = 48, EXTRA = 14;
    private static final int[] IN_X = {17, 35, 53, 17, 35, 53};
    private static final int[] IN_Y = {8, 8, 8, 26, 26, 26};

    private final RecipeType<IMachineRecipeList.RecipeEntry> type;
    private final IDrawable panel;
    private final IDrawable background;
    private final IDrawable icon;

    public AssemblerCategory(IGuiHelper helper, RecipeType<IMachineRecipeList.RecipeEntry> type,
                             ResourceLocation texture, ItemLike provider) {
        this.type = type;
        this.panel = helper.createDrawable(texture, U, V, W, H);
        this.background = helper.createBlankDrawable(W, H + EXTRA);
        this.icon = helper.createDrawableIngredient(mezz.jei.api.constants.VanillaTypes.ITEM_STACK, new ItemStack(provider));
    }

    @Override
    public RecipeType<IMachineRecipeList.RecipeEntry> getRecipeType() {
        return this.type;
    }

    @Override
    public Component getTitle() {
        return Component.translatable("jei." + BSMachines.MODID + ".assembler");
    }

    @Override
    public IDrawable getBackground() {
        return this.background;
    }

    @Override
    public IDrawable getIcon() {
        return this.icon;
    }

    @Override
    public void setRecipe(IRecipeLayoutBuilder builder, IMachineRecipeList.RecipeEntry entry, IFocusGroup focuses) {
        IInput[] inputs = entry.getInputs();
        for (int i = 0; i < inputs.length && i < IN_X.length; i++) {
            List<ItemStack> stacks = new ArrayList<>();
            for (ItemStack component : inputs[i].getComponents()) {
                stacks.add(IInput.copyWithSize(component, inputs[i].getInputSize()));
            }
            builder.addSlot(RecipeIngredientRole.INPUT, IN_X[i] - U, IN_Y[i] - V).addItemStacks(stacks);
        }
        builder.addSlot(RecipeIngredientRole.OUTPUT, 116 - U, 35 - V).addItemStacks(entry.getOutput().getAllOutputs());
    }

    @Override
    public void draw(IMachineRecipeList.RecipeEntry entry, IRecipeSlotsView slots, PoseStack stack, double mouseX, double mouseY) {
        this.panel.draw(stack, 0, 0);
        String cost = NumberFormat.getIntegerInstance(Locale.US).format(AssemblerCosts.get(entry));
        Component text = Component.translatable("jei." + BSMachines.MODID + ".cost", cost);
        Minecraft.getInstance().font.draw(stack, text, 2.0F, (float) (H + 3), 0x404040);
    }
}
