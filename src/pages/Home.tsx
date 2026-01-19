import { MembersList } from "../components/homePage/MembersList";
import { PageHeader } from "../components/PageHeader";

export const Home = () => {
  return (
    <div>
      <PageHeader title="Members Portal" subtitle="Manage your members." />

      <MembersList />
    </div>
  );
};
