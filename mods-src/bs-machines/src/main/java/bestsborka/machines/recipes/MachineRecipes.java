package bestsborka.machines.recipes;

import bestsborka.machines.BSMachines;
import ic2.api.recipes.registries.IMachineRecipeList;
import ic2.core.IC2;
import ic2.core.block.machines.recipes.MachineRecipeList;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.fml.loading.FMLEnvironment;

/**
 * One IC2 recipe list per Metal Former mode. Recipes are NOT hard-coded: they are IC2 datapack JSON files at
 * data/&lt;namespace&gt;/ic2_recipes/&lt;folder&gt;/&lt;name&gt;.json, where folder is metal_former_rolling,
 * metal_former_extruding or metal_former_cutting (same format as IC2C's own compressor recipes).
 */
public class MachineRecipes {
    public static final MachineRecipeList ROLLING = new MachineRecipeList("metal_former_rolling", list -> { });
    public static final MachineRecipeList EXTRUDING = new MachineRecipeList("metal_former_extruding", list -> { });
    public static final MachineRecipeList CUTTING = new MachineRecipeList("metal_former_cutting", list -> { });

    public static void init() {
        register(true);
        if (FMLEnvironment.dist.isClient()) {
            register(false);
        }
    }

    private static void register(boolean server) {
        IC2.RECIPES.get(server).registerRecipeList(new ResourceLocation(BSMachines.MODID, "metal_former_rolling"), ROLLING);
        IC2.RECIPES.get(server).registerRecipeList(new ResourceLocation(BSMachines.MODID, "metal_former_extruding"), EXTRUDING);
        IC2.RECIPES.get(server).registerRecipeList(new ResourceLocation(BSMachines.MODID, "metal_former_cutting"), CUTTING);
    }

    public static IMachineRecipeList getList(int mode) {
        switch (mode) {
            case 1:
                return EXTRUDING;
            case 2:
                return CUTTING;
            default:
                return ROLLING;
        }
    }
}
