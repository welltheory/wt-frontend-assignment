import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Pagination,
    Stack,
    Avatar,

} from "@mui/material";

import { useEffect, useState } from "react";
import type { Member } from "../types/member";
import { useNavigate } from "react-router-dom";
import { listMembers } from "../api/members";



export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadMembers() {
            try {
                setLoading(true);

                const res = await listMembers(page, limit);

                if (res.ok) {
                    setMembers(res.data.data);
                    setTotalPages(res.data.totalPages);
                } else {
                    console.error("Failed API:", res.error);
                }
            } catch (err) {
                console.log("Failed to fetch members", err);
            } finally {
                setLoading(false);
            }
        }

        loadMembers();
    }, [page, limit]);

    if (loading) {
        return <p>Loading... please wait</p>;
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Members
                    </Typography>

                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ backgroundColor: "white", color: "black" }}
                        onClick={() => navigate("/members/new")}
                    >
                        Add
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Member List
                    </Typography>

                    <List>
                        {members.map((member) => (
                            <ListItem key={member.id} divider disablePadding>
                                <ListItemButton onClick={() => navigate(`/members/${member.id}`)}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            src={member.photoUrl || undefined}
                                            alt={`${member.firstName} ${member.lastName}`}
                                            sx={{ width: 48, height: 48 }}
                                        />

                                        <ListItemText
                                            primary={`${member.firstName} ${member.lastName}`}
                                            secondary={`DOB: ${member.dateOfBirth} | Sex: ${member.sex} | Status: ${member.status}`}
                                        />
                                    </Stack>
                                </ListItemButton>
                            </ListItem>
                        ))}

                    </List>
                    {/* Pagination */}
                    <Stack alignItems="center" sx={{ mt: 3 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                        />
                    </Stack>

                </Paper>
            </Container>


        </>

    );
}
