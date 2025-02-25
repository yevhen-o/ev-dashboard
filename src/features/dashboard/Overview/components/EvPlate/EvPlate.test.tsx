import { render, screen } from "@testing-library/react";
import { EvPlate } from "./EvPlate";
import { vi } from "vitest";

// Mock translation function
const t = vi.fn((key) => key);

vi.mock("src/shared/hooks", () => ({
  useAppTranslation: () => ({ t }),
  useTypedSelector: vi.fn((selector) =>
    selector({
      evList: {
        itemsById: {
          EV123: {
            win: "EV123",
            mode: "Moving",
            speed: 50,
            batteryLevel: 80,
            energyConsumption: 123,
          },
          EV124: {
            win: "EV123",
            mode: "Idle",
            speed: 0,
            batteryLevel: 80,
            energyConsumption: 0,
          },
        },
      },
      layout: { hiddenFields: ["distance"] },
    })
  ),
}));

describe("EvPlate Component", () => {
  it("renders correctly when EV data is available", () => {
    render(<EvPlate win="EV123" />);

    expect(screen.getByText("EV123")).toBeInTheDocument();
    expect(screen.getByText("telemetryTitleSpeed")).toBeInTheDocument();
    const speedContainer = screen
      .getByText("telemetryTitleSpeed")
      .closest(".data-plate");
    expect(speedContainer).toHaveTextContent("50");
    expect(speedContainer).toHaveTextContent("km/h");
    expect(screen.getByText("telemetryTitleBatteryLevel")).toBeInTheDocument();
    const consumptionContainer = screen
      .getByText("telemetryTitleEnergyConsumption")
      .closest(".data-plate");
    expect(consumptionContainer).toHaveTextContent("123");
    expect(consumptionContainer).toHaveTextContent("Wh/km");
  });

  it("returns null when EV data is not found", () => {
    const { container } = render(<EvPlate win="NON_EXISTENT_EV" />);

    expect(container.firstChild).toBeNull();
  });

  it("hides fields that are in hiddenFields", () => {
    render(<EvPlate win="EV123" />);

    expect(
      screen.queryByText("telemetryTitleDistance")
    ).not.toBeInTheDocument();
    expect(screen.getByText("telemetryTitleBatteryLevel")).toBeInTheDocument();
  });

  it("only displays data relevant to the EV's mode", () => {
    render(<EvPlate win="EV124" />);

    expect(screen.getByText("telemetryTitleBatteryLevel")).toBeInTheDocument();
    expect(screen.queryByText("telemetryTitleSpeed")).not.toBeInTheDocument();
  });
});
