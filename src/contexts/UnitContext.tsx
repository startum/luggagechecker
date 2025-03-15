
import React, { createContext, useContext, useState } from 'react';

type UnitSystem = 'metric' | 'imperial';

interface UnitContextType {
  unitSystem: UnitSystem;
  toggleUnitSystem: () => void;
  convertToDisplayUnit: (value: number, type: 'length' | 'weight') => number;
  formatValue: (value: number, type: 'length' | 'weight') => string;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

  const toggleUnitSystem = () => {
    setUnitSystem(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  // Convert values for display based on the current unit system
  const convertToDisplayUnit = (value: number, type: 'length' | 'weight'): number => {
    if (unitSystem === 'metric') return value;
    
    // Convert to imperial
    if (type === 'length') {
      // Convert cm to inches (1 cm = 0.393701 inches)
      return Number((value * 0.393701).toFixed(1));
    } else {
      // Convert kg to lb (1 kg = 2.20462 lb)
      return Number((value * 2.20462).toFixed(1));
    }
  };

  // Format value with the appropriate unit
  const formatValue = (value: number, type: 'length' | 'weight'): string => {
    const convertedValue = convertToDisplayUnit(value, type);
    
    if (unitSystem === 'metric') {
      return `${convertedValue} ${type === 'length' ? 'cm' : 'kg'}`;
    } else {
      return `${convertedValue} ${type === 'length' ? 'in' : 'lb'}`;
    }
  };

  return (
    <UnitContext.Provider value={{ 
      unitSystem, 
      toggleUnitSystem,
      convertToDisplayUnit,
      formatValue
    }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = (): UnitContextType => {
  const context = useContext(UnitContext);
  if (context === undefined) {
    throw new Error('useUnit must be used within a UnitProvider');
  }
  return context;
};
