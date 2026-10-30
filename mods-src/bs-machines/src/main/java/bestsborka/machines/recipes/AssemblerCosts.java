package bestsborka.machines.recipes;

import ic2.api.recipes.registries.IMachineRecipeList;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.registries.ForgeRegistries;

import java.util.HashMap;
import java.util.Map;

/** Total EU per Assembler operation, keyed by the output item's registry path (values from IC2Additions 1.12.2). */
public class AssemblerCosts {
    public static final int DEFAULT = 25000;
    private static final Map<String, Integer> COSTS = new HashMap<>();

    static {
        COSTS.put("carbon_sheathing", 25000);
        COSTS.put("nano_sheathing", 50000);
        COSTS.put("quantum_sheathing", 75000);
        COSTS.put("hybrid_circuit", 12500);
        COSTS.put("nano_circuit", 40000);
        COSTS.put("quantum_circuit", 80000);
    }

    public static int get(IMachineRecipeList.RecipeEntry entry) {
        for (ItemStack out : entry.getOutput().getAllOutputs()) {
            if (out.isEmpty()) {
                continue;
            }
            Integer cost = COSTS.get(ForgeRegistries.ITEMS.getKey(out.getItem()).getPath());
            if (cost != null) {
                return cost;
            }
        }
        return DEFAULT;
    }
}
