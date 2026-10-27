package bestsborka.machines.jei;

import ic2.api.recipes.registries.IMachineRecipeList;
import ic2.jeiplugin.core.recipes.categories.BasicMachineCategory;
import mezz.jei.api.helpers.IGuiHelper;
import mezz.jei.api.recipe.RecipeType;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.level.ItemLike;

/** Same layout as IC2's single-input machines, but with a per-mode title. */
public class MetalFormerCategory extends BasicMachineCategory {
    private final String modeName;

    public MetalFormerCategory(IGuiHelper helper, RecipeType<IMachineRecipeList.RecipeEntry> type,
                               ResourceLocation texture, ItemLike provider, String modeName) {
        super(helper, type, texture, provider);
        this.modeName = modeName;
    }

    @Override
    public Component getTitle() {
        return Component.translatable("jei.bs_machines.metal_former." + this.modeName);
    }
}
