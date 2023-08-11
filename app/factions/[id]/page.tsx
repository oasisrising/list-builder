import { RosterBuilderDisplay } from '../../../components/RosterBuilderDisplay/RosterBuilderDisplay';
import Image from 'next/image';

export default function Page({ params }: { params: { id: string } }) {
  return <RosterBuilderDisplay factionId={params.id} />;
}
