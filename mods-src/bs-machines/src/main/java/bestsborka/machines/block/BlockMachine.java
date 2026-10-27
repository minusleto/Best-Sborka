package bestsborka.machines.block;

import bestsborka.machines.BSMachines;
import ic2.core.block.base.drops.IBlockDropProvider;
import ic2.core.block.base.tiles.BaseTileEntity;
import ic2.core.block.machines.BaseMachineBlock;
import ic2.core.item.base.IC2BlockItem;
import ic2.core.platform.registries.IC2Blocks;
import ic2.core.platform.rendering.features.providers.ToggleProvider;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.entity.BlockEntityType;

public class BlockMachine extends BaseMachineBlock {
    public BlockMachine(String blockName, IBlockDropProvider drop, BlockEntityType<? extends BaseTileEntity> type) {
        super(blockName, drop, new ToggleProvider(BSMachines.MODID, blockName), type);
        IC2Blocks.registerBlock(this);
    }

    @Override
    public BlockItem createItem() {
        return new IC2BlockItem(this, new Item.Properties().tab(BSMachines.CREATIVE_TAB));
    }
}
