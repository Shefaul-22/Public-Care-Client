import React from "react";
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

const InvoicePDF = ({ payment }) => {
    if (!payment) return null;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Payment Invoice</Text>

                <View style={styles.section}>
                    <Text>
                        <Text style={styles.label}>Invoice ID: </Text>
                        {payment._id}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Date: </Text>
                        {new Date(payment.paidAt).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text>
                        <Text style={styles.label}>Title: </Text>
                        {payment.title}
                    </Text>
                    <Text>
                        <Text style={styles.label}>User: </Text>
                        {payment.boostedBy || payment.email}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text>
                        <Text style={styles.label}>Amount: </Text>
                        {payment.amount} {payment.currency}
                    </Text>
                    <Text>
                        <Text style={styles.label}>Status: </Text>
                        {payment.paymentStatus}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default InvoicePDF;
