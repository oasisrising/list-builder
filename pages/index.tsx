import Head from 'next/head';
import Layout from '../components/layout';
import { getSortedUnitsData } from '../lib/units';
import { UnitCard } from '../components/UnitCard/UnitCard';
import { Unit } from '../models/Unit';

export async function getStaticProps() {
  const allUnitsData = getSortedUnitsData();
  getSortedUnitsData();
  return {
    props: {
      allUnitsData,
    },
  };
}

export default function Home({ allUnitsData }) {
  return (
    <Layout home>
      <Head>
        <title>LIST BUILDER</title>
      </Head>

      {allUnitsData.map((unit: Unit) => (
        <UnitCard unit={unit} key={unit.id} />
      ))}
    </Layout>
  );
}
