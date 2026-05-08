import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Button, Input, Card } from '@components/index';
import { colors, spacing, typography, borderRadius } from '@constants/theme';
import { useTransactionStore } from '@store/transactionStore';
import { useAuthStore } from '@store/authStore';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@constants/index';
import { v4 as uuidv4 } from 'uuid';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { webSafeAnimation } from '../utils/animations';

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Add Transaction Modal Component
 * Form to create new transactions with animations
 */
const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ visible, onClose }) => {
  const { addTransaction } = useTransactionStore();
  const { user } = useAuthStore();

  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (!date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTransaction = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newTransaction = {
        id: uuidv4(),
        userId: user?.id || 'user-1',
        amount: parseFloat(amount),
        category,
        type,
        description,
        date: new Date(date).toISOString(),
        createdAt: new Date().toISOString(),
      };

      addTransaction(newTransaction);

      // Reset form and close
      setAmount('');
      setCategory('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setType('expense');
      setErrors({});
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to add transaction. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Add Transaction</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Type Selection */}
            <Animated.View entering={webSafeAnimation(FadeInDown.delay(100).springify())}>
              <Text style={styles.label}>Transaction Type</Text>
              <View style={styles.typeContainer}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === 'expense' && styles.typeButtonActive,
                  ]}
                  onPress={() => {
                    setType('expense');
                    setCategory('');
                  }}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      type === 'expense' && styles.typeButtonTextActive,
                    ]}
                  >
                    💸 Expense
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    type === 'income' && styles.typeButtonActive,
                  ]}
                  onPress={() => {
                    setType('income');
                    setCategory('');
                  }}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      type === 'income' && styles.typeButtonTextActive,
                    ]}
                  >
                    💰 Income
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            {/* Amount Input */}
            <Animated.View entering={webSafeAnimation(FadeInDown.delay(200).springify())}>
              <Input
                label="Amount"
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                error={errors.amount}
                keyboardType="decimal-pad"
                required
              />
            </Animated.View>

            {/* Category Selection */}
            <Animated.View entering={webSafeAnimation(FadeInDown.delay(300).springify())}>
              <Text style={styles.label}>Category {errors.category && <Text style={styles.required}>*</Text>}</Text>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryItem,
                      category === cat.id && styles.categoryItemActive,
                    ]}
                    onPress={() => setCategory(cat.id)}
                  >
                    <Text style={styles.categoryIcon}>{cat.icon}</Text>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
            </Animated.View>

            {/* Description */}
            <Animated.View entering={webSafeAnimation(FadeInDown.delay(400).springify())}>
              <Input
                label="Description"
                placeholder="What did you spend on?"
                value={description}
                onChangeText={setDescription}
                error={errors.description}
                required
              />
            </Animated.View>

            {/* Date */}
            <Animated.View entering={webSafeAnimation(FadeInDown.delay(500).springify())}>
              <Input
                label="Date"
                placeholder="YYYY-MM-DD"
                value={date}
                onChangeText={setDate}
                error={errors.date}
                required
              />
            </Animated.View>

            {/* Error Message */}
            {errors.submit && (
              <Animated.View entering={webSafeAnimation(FadeInUp.springify())}>
                <Text style={styles.errorMessage}>{errors.submit}</Text>
              </Animated.View>
            )}

            {/* Submit Button */}
            <Animated.View entering={webSafeAnimation(FadeInUp.delay(600).springify())}>
              <Button
                title="Add Transaction"
                onPress={handleAddTransaction}
                loading={loading}
                fullWidth
                style={styles.submitButton}
              />
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
  },
  closeButton: {
    fontSize: 24,
    color: colors.text,
    fontWeight: typography.fontWeight.bold,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  required: {
    color: colors.danger,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.surfaceLight,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  categoryItem: {
    width: '23%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryItemActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  categoryName: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.danger,
    marginBottom: spacing.md,
    fontWeight: typography.fontWeight.medium,
  },
  errorMessage: {
    fontSize: typography.fontSize.md,
    color: colors.danger,
    marginBottom: spacing.lg,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: spacing.lg,
  },
});

export default AddTransactionModal;
