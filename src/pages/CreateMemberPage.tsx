import { MemberForm } from "../components/MemberForm";
import { createMember, uploadMemberPhoto } from "../api/members";
import { useNavigate } from "react-router-dom";

export default function CreateMemberPage() {
    const navigate = useNavigate();

    return (
        <MemberForm
            initialValues={{
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                sex: "male",
                status: "ACTIVE",
            }}
            initialPhotoUrl={null}
            onSubmit={async (values, photoFile) => {
                const res = await createMember(values);
                if (!res.ok) return alert(res.error);

                if (photoFile) {
                    await uploadMemberPhoto(res.data.id, photoFile);
                }

                navigate(`/members/${res.data.id}`);
            }}
        />
    );
}
