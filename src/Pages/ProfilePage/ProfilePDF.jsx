import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
    },
    title: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: "bold",
    },
    section: {
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
    },
});

const ProfilePDF = ({ user, userData }) => {
    if (!user || !userData) return null;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>User Profile Summary</Text>

                <View style={styles.section}>
                    <Text>
                        <Text style={styles.label}>Name: </Text>
                        {user.displayName || "N/A"}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Email: </Text>
                        {user.email}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Phone: </Text>
                        {userData.phone || "N/A"}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text>
                        <Text style={styles.label}>Role: </Text>
                        {userData.role}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Status: </Text>
                        {userData.userStatus || "Active"}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text>
                        <Text style={styles.label}>Account Created: </Text>
                        {user.metadata?.creationTime}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Last Sign In: </Text>
                        {user.metadata?.lastSignInTime}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default ProfilePDF;
