package bestsborka.machines.container;

import bestsborka.machines.blockentity.BlockEntityMetalFormer;
import ic2.core.block.machines.containers.lv.BasicMachineContainer;
import net.minecraft.world.entity.player.Player;

/** Standard IC2 single-input machine GUI plus the mode button. */
public class MetalFormerContainer extends BasicMachineContainer {
    public MetalFormerContainer(BlockEntityMetalFormer tile, Player player, int windowId) {
        super(tile, player, windowId);
        this.addComponent(new ModeButtonComponent(tile));
    }
}
