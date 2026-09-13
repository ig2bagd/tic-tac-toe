import { useParams } from 'react-router';

export default function ProfilePage() {
  const params = useParams();
  return (
    <div>
      <h1>Profile Page {params.profileId}</h1>
    </div>
  );
}