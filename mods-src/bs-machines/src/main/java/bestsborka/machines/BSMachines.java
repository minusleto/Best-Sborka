package bestsborka.machines;

import bestsborka.machines.init.ModBlocks;
import bestsborka.machines.recipes.MachineRecipes;
import net.minecraft.world.item.CreativeModeTab;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegisterEvent;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Best-Sborka Machines: machines for IC2 Classic 1.19.2 that exist in IC2 Experimental 1.12.2.
 * Structure modelled on IC2C Extras by Trinsdar (LGPL-3.0).
 */
@Mod(BSMachines.MODID)
public class BSMachines {
    public static final String MODID = "bs_machines";
    public static final Logger LOGGER = LogManager.getLogger(MODID);

    public static final CreativeModeTab CREATIVE_TAB = new CreativeModeTab(MODID) {
        @Override
        public ItemStack makeIcon() {
            return new ItemStack(ModBlocks.METAL_FORMER);
        }
    };

    public BSMachines() {
        IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();
        bus.addListener(this::onRegister);
        bus.addListener(this::commonSetup);
    }

    private void onRegister(RegisterEvent event) {
        if (event.getRegistryKey() == ForgeRegistries.Keys.BLOCKS) {
            ModBlocks.init();
        }
    }

    private void commonSetup(FMLCommonSetupEvent event) {
        MachineRecipes.init();
    }
}
