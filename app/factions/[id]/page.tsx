import { RosterBuilderDisplay } from '../../../components/RosterBuilderDisplay/RosterBuilderDisplay';

export default function Page({ params }: { params: { id: string } }) {
  return <RosterBuilderDisplay factionId={params.id} />;
}
