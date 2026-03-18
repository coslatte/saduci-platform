import {
  SIMULATION_PAGE_TITLE,
  SIMULATION_PAGE_SUBTITLE,
} from "@/constants/constants";
import { Text } from "@/components/atoms/Text";

/**
 * Renders title and subtitle for the simulation module screen.
 * Used in X case: top header section of simulation route.
 */
export function SimulationPageHeader() {
  return (
    <div className="mb-8">
      <Text
        as="h1"
        size="xl"
        weight="bold"
        tracking="tight"
        className="text-slate-900 md:text-3xl"
      >
        {SIMULATION_PAGE_TITLE}
      </Text>
      <Text as="p" size="sm" muted className="mt-2">
        {SIMULATION_PAGE_SUBTITLE}
      </Text>
    </div>
  );
}
