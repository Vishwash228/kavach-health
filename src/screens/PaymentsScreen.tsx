import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBanner from '../components/StatusBanner';
import QRCode from 'react-native-qrcode-svg';

type BillItem = {
  title: string;
  amount: string;
  status: 'Pending' | 'Paid';
};

export default function PaymentsScreen() {
  const { colors } = useTheme();

  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const [bills, setBills] = useState<BillItem[]>([
    {
      title: 'Consultation Fee',
      amount: '₹650',
      status: 'Pending',
    },
    {
      title: 'Lab Package',
      amount: '₹1200',
      status: 'Paid',
    },
  ]);

  const paymentMethods = ['UPI', 'Card', 'Net Banking'];
  {paymentMethod === 'UPI' && (
  <View style={styles.qrBox}>
    <Text style={[styles.qrTitle, { color: colors.text }]}>
      Scan & Pay via UPI
    </Text>

    <QRCode
      value="upi://pay?pa=kavachhealth@upi&pn=Kavach%20Health&am=650"
      size={180}
    />

    <Text style={[styles.upiText, { color: colors.muted }]}>
      UPI ID: kavachhealth@upi
    </Text>

    <Text style={[styles.upiText, { color: colors.primary }]}>
      Amount: ₹650
    </Text>
  </View>
)}
  const payBill = (title: string) => {
    const id = `KVH${Date.now()}`;

    setBills((current) =>
      current.map((bill) =>
        bill.title === title
          ? { ...bill, status: 'Paid' }
          : bill
      )
    );

    setMessage(
      `${title} Paid Successfully ✅\nPayment Method: ${paymentMethod}\nTransaction ID: ${id}`
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Payments
      </Text>

      <Text style={[styles.subtitle, { color: colors.muted }]}>
        Review bills, settle pending invoices, and track payment status securely.
      </Text>

      {message ? (
        <StatusBanner message={message} tone="success" />
      ) : null}

      <Card style={styles.card}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Select Payment Method
        </Text>

        {paymentMethods.map((method) => (
          <Button
            key={method}
            title={method}
            onPress={() => setPaymentMethod(method)}
            variant={
              paymentMethod === method
                ? undefined
                : 'secondary'
            }
          />
        ))}

        <Text
          style={[
            styles.billStatus,
            { color: colors.muted },
          ]}
        >
          Selected: {paymentMethod}
        </Text>
      </Card>

      <Card style={styles.card}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Invoice Summary
        </Text>

        {bills.map((bill) => (
          <View
            key={bill.title}
            style={styles.billRow}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.billTitle,
                  { color: colors.text },
                ]}
              >
                {bill.title}
              </Text>

              <Text
                style={[
                  styles.billAmount,
                  { color: colors.primary },
                ]}
              >
                {bill.amount}
              </Text>

              <Text
                style={[
                  styles.billStatus,
                  { color: colors.muted },
                ]}
              >
                Status: {bill.status}
              </Text>
            </View>

            {bill.status === 'Pending' && (
              <Button
                title="Pay"
                onPress={() => payBill(bill.title)}
                variant="secondary"
              />
            )}
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  qrBox: {
  alignItems: 'center',
  marginTop: 20,
  padding: 15,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: '#e5e7eb',
},

qrTitle: {
  fontSize: 16,
  fontWeight: '700',
  marginBottom: 15,
},

upiText: {
  fontSize: 13,
  marginTop: 8,
  fontWeight: '600',
},
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 14,
    lineHeight: 20,
  },
  card: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
  },
  billTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  billAmount: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: '700',
  },
  billStatus: {
    fontSize: 12,
    marginTop: 2,
  },
});