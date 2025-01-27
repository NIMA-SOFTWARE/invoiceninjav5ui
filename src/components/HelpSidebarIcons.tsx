/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import Tippy from '@tippyjs/react';
import { endpoint, isSelfHosted } from '$app/common/helpers';
import { request } from '$app/common/helpers/request';
import { useCurrentAccount } from '$app/common/hooks/useCurrentAccount';
import { useCurrentUser } from '$app/common/hooks/useCurrentUser';
import { updateCompanyUsers } from '$app/common/stores/slices/company-users';
import { setIsMiniSidebar } from '$app/common/stores/slices/settings';
import { RootState } from '$app/common/stores/store';
import { useFormik } from 'formik';
import { useState } from 'react';
import {
  Facebook,
  GitHub,
  HelpCircle,
  Info,
  Mail,
  MessageSquare,
  Slack,
  Twitter,
  Youtube,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputField } from './forms';
import Toggle from './forms/Toggle';
import { Modal } from './Modal';
import { toast } from '$app/common/helpers/toast/toast';
import { useColorScheme } from '$app/common/colors';

interface Props {
  docsLink?: string;
}

export function HelpSidebarIcons(props: Props) {
  const [t] = useTranslation();
  const user = useCurrentUser();
  const account = useCurrentAccount();

  const dispatch = useDispatch();

  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [cronsNotEnabledModal, setCronsNotEnabledModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const isMiniSidebar = useSelector(
    (state: RootState) => state.settings.isMiniSidebar
  );

  const formik = useFormik({
    initialValues: {
      message: '',
      platform: 'R',
      send_logs: false,
    },
    onSubmit: (values) => {
      toast.processing();

      request('POST', endpoint('/api/v1/support/messages/send'), values)
        .then(() => toast.success('your_message_has_been_received'))
        .finally(() => {
          formik.setSubmitting(false);
          setIsContactVisible(false);
        });
    },
  });

  const refreshData = () => {
    setDisabledButton(true);

    request('POST', endpoint('/api/v1/refresh')).then((data) => {
      dispatch(updateCompanyUsers(data.data.data));
      setDisabledButton(false);
      setCronsNotEnabledModal(false);
    });
  };

  const colors = useColorScheme();

  return (
    <>
      <Modal
        title={t('contact_us')}
        visible={isContactVisible}
        onClose={setIsContactVisible}
      >
        <InputField
          label={t('from')}
          id="from"
          value={`${user?.first_name} - ${user?.email}`}
          disabled
        />

        <InputField
          element="textarea"
          label={t('message')}
          id="message"
          onChange={formik.handleChange}
        />

        <Toggle
          id="send_errors"
          label={t('include_recent_errors')}
          onChange={(value) => formik.setFieldValue('send_logs', value)}
        />

        <Button
          onClick={() => formik.submitForm()}
          disabled={formik.isSubmitting}
        >
          {t('send')}
        </Button>
      </Modal>
      <Modal
        title={t('crons_not_enabled')}
        visible={cronsNotEnabledModal}
        onClose={setCronsNotEnabledModal}
      >
        <Button
          onClick={() => {
            window.open(
              'https://invoiceninja.github.io/en/self-host-troubleshooting/#cron-not-running-queue-not-running',
              '_blank'
            );
          }}
        >
          {t('learn_more')}
        </Button>
        <Button disabled={disabledButton} onClick={refreshData}>
          {t('refresh_data')}
        </Button>
        <Button
          onClick={() => {
            setCronsNotEnabledModal(false);
          }}
        >
          {t('dismiss')}
        </Button>
      </Modal>
      <Modal
        title={t('about')}
        visible={isAboutVisible}
        onClose={setIsAboutVisible}
      >
        <section>
          <p className="text-gray-800">
            {user?.first_name} {user?.last_name}
          </p>

          <p>{user?.email}</p>
        </section>

        <div className="flex flex-wrap justify-center items-center space-x-4 pt-6">
          <a
            href="https://twitter.com/invoiceninja"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter />
          </a>

          <a
            href="https://www.facebook.com/invoiceninja"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook />
          </a>

          <a
            href="https://github.com/invoiceninja"
            target="_blank"
            rel="noreferrer"
          >
            <GitHub />
          </a>

          <a
            href="https://www.youtube.com/channel/UCXAHcBvhW05PDtWYIq7WDFA/videos"
            target="_blank"
            rel="noreferrer"
          >
            <Youtube />
          </a>

          <a
            href="http://slack.invoiceninja.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Slack />
          </a>
        </div>
      </Modal>

      <nav
        style={{ borderColor: colors.$5 }}
        className="flex p-2 justify-around text-white border-t"
      >
        {!isMiniSidebar && (
          <>
            {isSelfHosted() && account && !account.is_scheduler_running && (
              <button
                className="p-2 hover:bg-ninja-gray-darker rounded-full"
                onClick={() => setCronsNotEnabledModal(true)}
              >
                <Tippy
                  duration={0}
                  content={t('error')}
                  className="text-white rounded text-xs mb-2"
                >
                  <AlertCircle />
                </Tippy>
              </button>
            )}

            <button
              className="p-2 hover:bg-ninja-gray-darker rounded-full"
              onClick={() => setIsContactVisible(true)}
            >
              <Tippy
                duration={0}
                content={t('contact_us')}
                className="text-white rounded text-xs mb-2"
              >
                <Mail />
              </Tippy>
            </button>

            <a
              href="https://forum.invoiceninja.com"
              target="_blank"
              className="p-2 hover:bg-ninja-gray-darker rounded-full"
              rel="noreferrer"
            >
              <Tippy
                duration={0}
                content={t('support_forum')}
                className="text-white rounded text-xs mb-2"
              >
                <MessageSquare />
              </Tippy>
            </a>

            <a
              href={
                (props.docsLink &&
                  `https://invoiceninja.github.io/${props.docsLink}`) ||
                'https://invoiceninja.github.io'
              }
              target="_blank"
              className="p-2 hover:bg-ninja-gray-darker rounded-full"
              rel="noreferrer"
            >
              <Tippy
                duration={0}
                content={t('user_guide')}
                className="text-white rounded text-xs mb-2"
              >
                <HelpCircle />
              </Tippy>
            </a>

            <button
              className="p-2 hover:bg-ninja-gray-darker rounded-full"
              onClick={() => setIsAboutVisible(true)}
            >
              <Tippy
                duration={0}
                content={t('about')}
                className="text-white rounded text-xs mb-2"
              >
                <Info />
              </Tippy>
            </button>
          </>
        )}

        <button
          className="p-2 hover:bg-ninja-gray-darker rounded-full"
          onClick={() => dispatch(setIsMiniSidebar({ status: !isMiniSidebar }))}
        >
          <Tippy
            duration={0}
            content={isMiniSidebar ? t('show_menu') : t('hide_menu')}
            className="text-white rounded text-xs mb-2"
          >
            {isMiniSidebar ? <ChevronRight /> : <ChevronLeft />}
          </Tippy>
        </button>
      </nav>
    </>
  );
}
