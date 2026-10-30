package bestsborka.machines.container;

import bestsborka.machines.blockentity.BlockEntityAssembler;
import ic2.core.inventory.container.ContainerComponent;
import ic2.core.inventory.gui.components.simple.ChargeBarComponent;
import ic2.core.inventory.gui.components.simple.ProgressComponent;
import ic2.core.inventory.slot.FilterSlot;
import ic2.core.inventory.slot.UpgradeSlot;
import ic2.core.inventory.slot.XPSlot;
import ic2.core.utils.math.geometry.Box2i;
import ic2.core.utils.math.geometry.Vec2i;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.entity.player.Player;

/** GUI of the Assembler: 6 inputs (3x2), battery, output, 4 upgrades. Texture: textures/gui/assembler.png. */
public class AssemblerContainer extends ContainerComponent<BlockEntityAssembler> {
    private static final int[] IN_X = {17, 35, 53, 17, 35, 53};
    private static final int[] IN_Y = {8, 8, 8, 26, 26, 26};

    public static final Vec2i CHARGE_POS = new Vec2i(176, 0);
    public static final Box2i CHARGE_BOX = new Box2i(38, 54, 14, 14);
    public static final Vec2i PROGRESS_POS = new Vec2i(176, 14);
    public static final Box2i PROGRESS_BOX = new Box2i(79, 34, 24, 16);

    public AssemblerContainer(BlockEntityAssembler tile, Player player, int windowId) {
        super(tile, player, windowId);
        this.addSlot(FilterSlot.createDischargeSlot(tile, tile.tier, 0, 17, 53));
        for (int i = 0; i < BlockEntityAssembler.INPUTS.length; i++) {
            this.addSlot(new FilterSlot(tile, BlockEntityAssembler.INPUTS[i], IN_X[i], IN_Y[i], stack -> tile.acceptsInput(stack)));
        }
        this.addSlot(new XPSlot(tile, BlockEntityAssembler.OUTPUT, 116, 35));
        for (int i = 0; i < 4; i++) {
            this.addSlot(new UpgradeSlot(tile, 8 + i, 152, 8 + i * 18));
        }
        this.addPlayerInventory(player.getInventory());
        this.addComponent(new ChargeBarComponent(CHARGE_BOX, tile, CHARGE_POS, true));
        this.addComponent(new ProgressComponent(PROGRESS_BOX, tile, PROGRESS_POS, false));
    }

    @Override
    public ResourceLocation getTexture() {
        return BlockEntityAssembler.TEXTURE;
    }
}
