/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useShouldDisableCustomFields } from '$app/common/hooks/useShouldDisableCustomFields';
import { useTitle } from '$app/common/hooks/useTitle';
import { CustomFieldsPlanAlert } from '$app/components/CustomFieldsPlanAlert';
import { useTranslation } from 'react-i18next';
import { Card, Element } from '../../../../components/cards';
import { InputField } from '../../../../components/forms';
import Toggle from '../../../../components/forms/Toggle';
import { Settings } from '../../../../components/layouts/Settings';
import { Field } from '../components';
import { useCurrentCompany } from '$app/common/hooks/useCurrentCompany';
import { useHandleCustomFieldChange } from '$app/common/hooks/useHandleCustomFieldChange';
import { useHandleCompanySave } from '../../common/hooks/useHandleCompanySave';
import { useHandleCustomSurchargeFieldChange } from '$app/common/hooks/useHandleCustomSurchargeFieldChange';

export function Invoices() {
  const { documentTitle } = useTitle('custom_fields');

  const [t] = useTranslation();

  const disabledCustomFields = useShouldDisableCustomFields();

  const pages = [
    { name: t('settings'), href: '/settings' },
    { name: t('custom_fields'), href: '/settings/custom_fields' },
    { name: t('invoices'), href: '/settings/custom_fields/invoices' },
  ];

  const company = useCurrentCompany();
  const handleChange = useHandleCustomFieldChange();
  const handleSurchargesChange = useHandleCustomSurchargeFieldChange();
  const save = useHandleCompanySave();

  return (
    <Settings
      title={documentTitle}
      breadcrumbs={pages}
      docsLink="en/advanced-settings/#custom_fields"
      onSaveClick={save}
    >
      <CustomFieldsPlanAlert />

      <Card title={`${t('custom_fields')}: ${t('invoices')}`}>
        {['invoice1', 'invoice2', 'invoice3', 'invoice4'].map((field) => (
          <Field
            key={field}
            field={field}
            placeholder={t('invoice_field')}
            onChange={(value) => handleChange(field, value)}
            initialValue={company.custom_fields[field]}
          />
        ))}
      </Card>

      <Card>
        {['surcharge1', 'surcharge2', 'surcharge3', 'surcharge4'].map(
          (field, index) => (
            <Element
              key={index}
              leftSide={
                <InputField
                  id={field}
                  placeholder={t('surcharge_field')}
                  value={company.custom_fields[field]}
                  onValueChange={(value) =>
                    handleSurchargesChange(field, value)
                  }
                  disabled={disabledCustomFields}
                />
              }
            >
              <Toggle label={t('charge_taxes')} />
            </Element>
          )
        )}
      </Card>
    </Settings>
  );
}
