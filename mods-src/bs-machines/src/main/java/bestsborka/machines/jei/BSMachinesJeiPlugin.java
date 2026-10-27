package bestsborka.machines.jei;

import bestsborka.machines.BSMachines;
import bestsborka.machines.blockentity.BlockEntityMetalFormer;
import bestsborka.machines.init.ModBlocks;
import bestsborka.machines.recipes.MachineRecipes;
import ic2.api.recipes.registries.IMachineRecipeList;
import ic2.jeiplugin.JEIModule;
import mezz.jei.api.IModPlugin;
import mezz.jei.api.JeiPlugin;
import mezz.jei.api.helpers.IGuiHelper;
import mezz.jei.api.recipe.RecipeType;
import mezz.jei.api.registration.IRecipeCatalystRegistration;
import mezz.jei.api.registration.IRecipeCategoryRegistration;
import mezz.jei.api.registration.IRecipeRegistration;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.ItemStack;

@JeiPlugin
public class BSMachinesJeiPlugin implements IModPlugin {
    public static final RecipeType<IMachineRecipeList.RecipeEntry> ROLLING =
            RecipeType.create(BSMachines.MODID, "metal_former_rolling", IMachineRecipeList.RecipeEntry.class);
    public static final RecipeType<IMachineRecipeList.RecipeEntry> EXTRUDING =
            RecipeType.create(BSMachines.MODID, "metal_former_extruding", IMachineRecipeList.RecipeEntry.class);
    public static final RecipeType<IMachineRecipeList.RecipeEntry> CUTTING =
            RecipeType.create(BSMachines.MODID, "metal_former_cutting", IMachineRecipeList.RecipeEntry.class);

    @Override
    public ResourceLocation getPluginUid() {
        return new ResourceLocation(BSMachines.MODID, "jei_plugin");
    }

    @Override
    public void registerCategories(IRecipeCategoryRegistration registration) {
        if (!JEIModule.ALLOWS_LOADING) return;
        IGuiHelper helper = registration.getJeiHelpers().getGuiHelper();
        ResourceLocation texture = BlockEntityMetalFormer.TEXTURE;
        registration.addRecipeCategories(
                new MetalFormerCategory(helper, ROLLING, texture, ModBlocks.METAL_FORMER, "rolling"),
                new MetalFormerCategory(helper, EXTRUDING, texture, ModBlocks.METAL_FORMER, "extruding"),
                new MetalFormerCategory(helper, CUTTING, texture, ModBlocks.METAL_FORMER, "cutting"));
    }

    @Override
    public void registerRecipeCatalysts(IRecipeCatalystRegistration registration) {
        if (!JEIModule.ALLOWS_LOADING) return;
        ItemStack machine = new ItemStack(ModBlocks.METAL_FORMER);
        registration.addRecipeCatalyst(machine, ROLLING);
        registration.addRecipeCatalyst(machine, EXTRUDING);
        registration.addRecipeCatalyst(machine, CUTTING);
    }

    @Override
    public void registerRecipes(IRecipeRegistration registration) {
        if (!JEIModule.ALLOWS_LOADING) return;
        registration.addRecipes(ROLLING, MachineRecipes.ROLLING.getAllEntries());
        registration.addRecipes(EXTRUDING, MachineRecipes.EXTRUDING.getAllEntries());
        registration.addRecipes(CUTTING, MachineRecipes.CUTTING.getAllEntries());
    }
}
