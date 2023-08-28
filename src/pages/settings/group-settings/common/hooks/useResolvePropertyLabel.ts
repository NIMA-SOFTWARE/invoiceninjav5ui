/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useTranslation } from 'react-i18next';

export const useResolvePropertyLabel = () => {
  const [t] = useTranslation();

  const KEYWORD_ALIASES = [
    { default_expense_payment_type_id: 'expense_payment_type' },
    { auto_bill_date: 'auto_bill_on' },
    { use_credits_payment: 'use_available_credits' },
    { client_portal_allow_over_payment: 'allow_over_payment' },
    { client_portal_allow_under_payment: 'allow_under_payment' },
    { client_portal_under_payment_minimum: 'minimum_under_payment_amount' },
    { client_initiated_payments_minimum: 'minimum_payment_amount' },
    { counter_number_applied: 'generate_number' },
    { recurring_number_prefix: 'recurring_prefix' },
    { reset_counter_frequency_id: 'reset_counter' },
    { client_manual_payment_notification: 'manual_payment_email' },
    { client_online_payment_notification: 'online_payment_email' },
    {
      recurring_invoice_number_pattern: `${t('recurring_invoice')} ${t(
        'number_pattern'
      )}`,
    },
    {
      recurring_invoice_number_counter: `${t('recurring_invoice')} ${t(
        'number_counter'
      )}`,
    },
    {
      project_number_pattern: `${t('project')} ${t('number_pattern')}`,
    },
    {
      project_number_counter: `${t('project')} ${t('number_counter')}`,
    },
    {
      recurring_expense_number_pattern: `${t('recurring_expense')} ${t(
        'number_pattern'
      )}`,
    },
    {
      recurring_expense_number_counter: `${t('recurring_expense')} ${t(
        'number_counter'
      )}`,
    },
    {
      purchase_order_number_pattern: `${t('purchase_order')} ${t(
        'number_pattern'
      )}`,
    },
    {
      purchase_order_number_counter: `${t('purchase_order')} ${t(
        'number_counter'
      )}`,
    },
    { client_portal_enable_uploads: 'client_document_upload' },
    { vendor_portal_enable_uploads: 'vendor_document_upload' },
    { client_portal_terms: 'terms_of_service' },
    { client_portal_privacy_policy: 'privacy_policy' },
    { enable_client_portal_password: 'enable_portal_password' },
    { portal_custom_head: 'header' },
    { portal_custom_footer: 'footer' },
    { portal_custom_css: 'custom_css' },
    { portal_custom_js: 'custom_javascript' },
    { email_sending_method: 'email_provider' },
    { mailgun_secret: 'secret' },
    { mailgun_endpoint: 'endpoint' },
    { email_from_name: 'from_name' },
    { entity_send_time: 'send_time' },
    { tax_name1: 'default_tax_name_1' },
    { tax_rate1: 'default_tax_rate_1' },
    { tax_name2: 'default_tax_name_2' },
    { tax_rate2: 'default_tax_rate_2' },
    { tax_name3: 'default_tax_name_3' },
    { tax_rate3: 'default_tax_rate_3' },
    { enable_client_portal_tasks: 'show_tasks_in_client_portal' },
    { show_all_tasks_client_portal: 'tasks_shown_in_portal' },
    { reset_counter_date: 'next_reset' },
    { accept_client_input_quote_approval: 'accept_purchase_order_number' },
    { postmark_secret: 'secret' },
  ];

  return (key: string) => {
    const keywordAlias = KEYWORD_ALIASES.find(
      (keyword) => keyword[key as keyof typeof keyword]
    );

    if (keywordAlias) {
      return t(keywordAlias[key as keyof typeof keywordAlias] as string);
    }

    return t(key);
  };
};
