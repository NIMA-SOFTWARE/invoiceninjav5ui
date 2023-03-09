/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { AxiosResponse } from 'axios';
import { endpoint } from '$app/common/helpers';
import { request } from '$app/common/helpers/request';
import { useQuery } from 'react-query';
import { route } from '$app/common/helpers/route';
import { Params } from './common/params.interface';
import { GenericSingleResourceResponse } from '$app/common/interfaces/generic-api-response';
import { TaxRate } from '$app/common/interfaces/tax-rate';

export function useTaxRatesQuery(params: Params) {
  return useQuery(
    ['/api/v1/tax_rates', params],
    () =>
      request(
        'GET',
        endpoint(
          '/api/v1/tax_rates?per_page=:perPage&page=:currentPage&sort=:sort',
          {
            perPage: params.perPage,
            currentPage: params.currentPage,
            sort: params.sort ?? 'id|asc',
          }
        )
      ),
    { staleTime: Infinity }
  );
}

export function useTaxRateQuery(params: { id: string | undefined }) {
  return useQuery(
    route('/api/v1/tax_rates/:id', { id: params.id }),
    () => request('GET', endpoint('/api/v1/tax_rates/:id', { id: params.id })),
    { staleTime: Infinity }
  );
}

export function bulk(
  id: string[],
  action: 'archive' | 'restore' | 'delete'
): Promise<AxiosResponse> {
  return request('POST', endpoint('/api/v1/tax_rates/bulk'), {
    action,
    ids: id,
  });
}

export function useBlankTaxRateQuery() {
  return useQuery<TaxRate>(
    '/api/v1/tax_rates/create',
    () =>
      request('GET', endpoint('/api/v1/tax_rates/create')).then(
        (response: GenericSingleResourceResponse<TaxRate>) => response.data.data
      ),
    { staleTime: Infinity }
  );
}
