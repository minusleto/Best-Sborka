package bestsborka.machines.container;

import bestsborka.machines.blockentity.BlockEntityMetalFormer;
import ic2.core.inventory.gui.IC2Screen;
import ic2.core.inventory.gui.components.GuiWidget;
import ic2.core.utils.math.geometry.Box2i;
import net.minecraft.network.chat.Component;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.api.distmarker.OnlyIn;
import net.minecraftforge.client.gui.widget.ExtendedButton;

import java.util.Set;

/** GUI button that cycles the Metal Former mode (pattern taken from IC2C's Slow Grinder speed button). */
public class ModeButtonComponent extends GuiWidget {
    private final BlockEntityMetalFormer tile;

    public ModeButtonComponent(BlockEntityMetalFormer tile) {
        super(Box2i.EMPTY_BOX);
        this.tile = tile;
    }

    @Override
    protected void addRequests(Set<ActionRequest> requests) {
        requests.add(ActionRequest.GUI_INIT);
        requests.add(ActionRequest.GUI_TICK);
    }

    @Override
    @OnlyIn(Dist.CLIENT)
    public void init(IC2Screen gui) {
        gui.addRenderableWidget(0, new ExtendedButton(
                gui.getGuiLeft() + 72, gui.getGuiTop() + 56, 56, 14,
                this.label(),
                button -> this.tile.sendToServer(BlockEntityMetalFormer.EVENT_CYCLE_MODE, 0)));
    }

    @Override
    @OnlyIn(Dist.CLIENT)
    public void tick(IC2Screen gui) {
        gui.getButton(0).setMessage(this.label());
    }

    private Component label() {
        int index = Math.floorMod((int) this.tile.mode, BlockEntityMetalFormer.MODE_COUNT);
        return Component.translatable("gui.bs_machines.mode." + BlockEntityMetalFormer.MODE_NAMES[index]);
    }
}
