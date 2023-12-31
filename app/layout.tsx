import { getSortedUnitsData } from '../lib/units';
import { getWeaponAbilitiesData } from '../lib/weapons';
import FactionDataProvider from '../providers/FactionDataProvider/FactionDataContext';
import WeaponsDataProvider from '../providers/WeaponDataProvider/WeaponDataContext';
import { CustomTheme } from '../styles/CustomTheme';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allFactionData = getSortedUnitsData();
  const allWeaponAbilities = getWeaponAbilitiesData();
  return (
    <html lang='en'>
      <body>
        <FactionDataProvider allFactionData={allFactionData}>
          <WeaponsDataProvider allWeaponsData={allWeaponAbilities}>
            <CustomTheme>{children}</CustomTheme>
          </WeaponsDataProvider>
        </FactionDataProvider>
      </body>
    </html>
  );
}
