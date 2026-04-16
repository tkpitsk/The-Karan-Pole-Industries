export type SteelProfileType =
  | "plate"
  | "round-pipe"
  | "sq-rect-pipe"
  | "round-bar"
  | "square-flat-bar"
  | "angle"
  | "channel"
  | "beam";

export interface Dimensions {
  length?: number; // in meters (default 1)
  width?: number; // in mm (or meters for plates)
  plateWidthMeters?: number; // in meters for plates
  height?: number; // in mm (or Side B)
  thickness?: number; // in mm
  diameter?: number; // in mm
  webThickness?: number; // in mm
  flangeThickness?: number; // in mm
}

const STEEL_DENSITY = 7850; // kg/m^3
const MM2_TO_M2 = 0.000001; // convert mm^2 to m^2

/**
 * Calculates the theoretical weight of a steel profile.
 * Returns weight in Kilograms (kg).
 */
export function calculateSteelWeight(
  type: SteelProfileType,
  dim: Dimensions,
  quantity: number = 1
): number {
  const L = dim.length || 1; // Length in meters
  let area_mm2 = 0;
  let weight_kg = 0;

  switch (type) {
    case "plate":
      // Plate dimensions: Length(m), Width(m), Thickness(mm)
      const w_m = dim.plateWidthMeters || 1;
      const t_m = (dim.thickness || 0) / 1000;
      weight_kg = L * w_m * t_m * STEEL_DENSITY;
      break;

    case "round-pipe":
      // Outer Diameter (mm), Thickness (mm)
      const D = dim.diameter || 0;
      const t_pipe = dim.thickness || 0;
      if (D > 2 * t_pipe) {
        // Area = pi/4 * (D^2 - d^2) where d = D - 2t
        area_mm2 = (Math.PI / 4) * (Math.pow(D, 2) - Math.pow(D - 2 * t_pipe, 2));
      }
      weight_kg = area_mm2 * MM2_TO_M2 * L * STEEL_DENSITY;
      break;

    case "sq-rect-pipe":
      // Width (mm), Height (mm), Thickness (mm)
      const w_pipe = dim.width || 0;
      const h_pipe = dim.height || w_pipe; // if height missing, assume square
      const t_sq_pipe = dim.thickness || 0;
      if (w_pipe > 2 * t_sq_pipe && h_pipe > 2 * t_sq_pipe) {
        area_mm2 = w_pipe * h_pipe - (w_pipe - 2 * t_sq_pipe) * (h_pipe - 2 * t_sq_pipe);
      }
      weight_kg = area_mm2 * MM2_TO_M2 * L * STEEL_DENSITY;
      break;

    case "round-bar":
      // Diameter (mm)
      const d_bar = dim.diameter || 0;
      area_mm2 = (Math.PI / 4) * Math.pow(d_bar, 2);
      weight_kg = area_mm2 * MM2_TO_M2 * L * STEEL_DENSITY;
      break;

    case "square-flat-bar":
      // Width (mm), Thickness/Height (mm)
      const w_flat = dim.width || 0;
      const t_flat = dim.thickness || dim.height || w_flat; 
      area_mm2 = w_flat * t_flat;
      weight_kg = area_mm2 * MM2_TO_M2 * L * STEEL_DENSITY;
      break;

    case "angle":
      // Leg A (width), Leg B (height), Thickness (mm)
      const legA = dim.width || 0;
      const legB = dim.height || legA; // equal angle if B not provided
      const t_angle = dim.thickness || 0;
      // Area = (A * t) + ((B - t) * t)
      if (legA > 0 && legB > 0 && t_angle > 0) {
        area_mm2 = (legA * t_angle) + ((legB - t_angle) * t_angle);
      }
      weight_kg = area_mm2 * MM2_TO_M2 * L * STEEL_DENSITY;
      break;

    case "channel":
      // U-Channel: Height (mm), Width (mm), Web Thickness, Flange Thickness
      // Height = web height. Width = flange width.
      const h_chan = dim.height || 0;
      const w_chan = dim.width || 0;
      const tw_chan = dim.webThickness || dim.thickness || 0;
      const tf_chan = dim.flangeThickness || dim.thickness || 0;
      // Area = WebArea + 2 * FlangeArea (excluding overlap)
      // Web Area = h * tw
      // 2 Flange Areas = 2 * (w - tw) * tf
      if (h_chan > 0 && w_chan > 0 && tw_chan > 0 && tf_chan > 0) {
        area_mm2 = (h_chan * tw_chan) + 2 * ((w_chan - tw_chan) * tf_chan);
      }
      weight_kg = area_mm2 * MM2_TO_M2 * L * STEEL_DENSITY;
      break;

    case "beam":
      // I/H-Beam: Height(mm), Flange Width(mm), Web Thickness(mm), Flange Thickness(mm)
      const h_beam = dim.height || 0;
      const w_beam = dim.width || 0; // Flange width
      const tw_beam = dim.webThickness || dim.thickness || 0;
      const tf_beam = dim.flangeThickness || dim.thickness || 0;
      // Area = 2 * Flange Area + Web Area
      // 2 Flanges = 2 * w * tf
      // Web = (h - 2tf) * tw
      if (h_beam > 0 && w_beam > 0 && tw_beam > 0 && tf_beam > 0 && h_beam > 2 * tf_beam) {
        area_mm2 = 2 * (w_beam * tf_beam) + ((h_beam - 2 * tf_beam) * tw_beam);
      }
      weight_kg = area_mm2 * MM2_TO_M2 * L * STEEL_DENSITY;
      break;

    default:
      weight_kg = 0;
  }

  return weight_kg * quantity;
}
