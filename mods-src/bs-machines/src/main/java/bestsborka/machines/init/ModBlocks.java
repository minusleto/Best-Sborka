package bestsborka.machines.init;

import bestsborka.machines.block.BlockMachine;
import bestsborka.machines.blockentity.BlockEntityMetalFormer;
import ic2.core.block.base.drops.IBlockDropProvider;
import ic2.core.platform.registries.IC2Tiles;
import ic2.core.utils.tooltips.helper.ITooltipProvider;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.entity.BlockEntityType;

public class ModBlocks {
    public static final BlockEntityType<BlockEntityMetalFormer> METAL_FORMER_TYPE =
            IC2Tiles.createTile("metal_former", BlockEntityMetalFormer::new);

    public static final Block METAL_FORMER =
            new BlockMachine("metal_former", IBlockDropProvider.SELF_OR_MACHINE, METAL_FORMER_TYPE)
                    .addTooltip(ITooltipProvider.LV_MACHINE)
                    .addTooltip(ITooltipProvider.consumption(10));

    /** Loading this class registers the tile type and the block (done inside the BLOCKS RegisterEvent). */
    public static void init() {
    }
}
