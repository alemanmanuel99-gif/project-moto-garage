import cruiserIcon from '../images/moto-cruiser.svg';
import defaultIcon from '../images/moto-default.svg';
import offroadIcon from '../images/moto-offroad.svg';
import scooterIcon from '../images/moto-scooter.svg';
import sportIcon from '../images/moto-sport.svg';
import type { Motorcycle, Spec } from './types';

// La API no tiene fotos: cada tipo de moto se representa con un ícono propio
export function getTypeIcon(type = ''): string {
  const normalizedType = type.toLowerCase();
  if (normalizedType.includes('scooter')) return scooterIcon;
  if (normalizedType.includes('custom') || normalizedType.includes('cruiser')) return cruiserIcon;
  if (
    normalizedType.includes('enduro') ||
    normalizedType.includes('cross') ||
    normalizedType.includes('trial') ||
    normalizedType.includes('motard')
  ) {
    return offroadIcon;
  }
  if (normalizedType.includes('sport')) return sportIcon;
  return defaultIcon;
}

// Ficha técnica: solo los datos que la API sí trae para esa moto
export function getSpecs(motorcycle: Motorcycle): Spec[] {
  const specs: (Spec | null)[] = [
    motorcycle.engine ? { label: 'Motor', value: motorcycle.engine } : null,
    motorcycle.displacement ? { label: 'Cilindrada', value: motorcycle.displacement } : null,
    motorcycle.power ? { label: 'Potencia', value: motorcycle.power } : null,
    motorcycle.torque ? { label: 'Torque', value: motorcycle.torque } : null,
    motorcycle.top_speed ? { label: 'Velocidad máxima', value: motorcycle.top_speed } : null,
    motorcycle.gearbox ? { label: 'Caja', value: motorcycle.gearbox } : null,
    motorcycle.total_weight || motorcycle.dry_weight
      ? { label: 'Peso', value: motorcycle.total_weight ?? motorcycle.dry_weight ?? '' }
      : null,
    motorcycle.seat_height ? { label: 'Altura del asiento', value: motorcycle.seat_height } : null,
    motorcycle.fuel_capacity ? { label: 'Tanque', value: motorcycle.fuel_capacity } : null,
  ];
  return specs.filter((spec): spec is Spec => spec !== null);
}
