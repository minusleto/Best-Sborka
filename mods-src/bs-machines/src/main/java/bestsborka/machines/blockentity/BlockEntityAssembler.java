package bestsborka.machines.blockentity;

import bestsborka.machines.init.ModBlocks;
import bestsborka.machines.recipes.MachineRecipes;
import ic2.api.recipes.registries.IMachineRecipeList;
import ic2.core.block.machines.tiles.lv.AlloySmelterTileEntity;
import net.minecraft.core.BlockPos;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraft.world.level.block.state.BlockState;

/**
 * Assembler: two inputs, one output. Built on the IC2C Mixing Furnace (same slots and GUI),
 * but with its own recipe list (datapack folder "assembler") and slower, hungrier operation.
 */
public class BlockEntityAssembler extends AlloySmelterTileEntity {
    public BlockEntityAssembler(BlockPos pos, BlockState state) {
        super(pos, state);
        this.energyConsume = this.defaultEnergyConsume = 32;
        this.operationLength = this.defaultOperationLength = 400;
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
    public IMachineRecipeList getRecipeList() {
        return MachineRecipes.ASSEMBLER;
    }
}
