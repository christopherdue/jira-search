import React, { ReactElement } from 'react';
import { DocSend } from '@wix/wix-ui-icons-common';
import { Button, ButtonProps, Text, Layout } from '@wix/answers-ui-libby';

function TLDRButton({ onClick }: ButtonProps): ReactElement {
  return (
    <Button type="tertiary" onClick={onClick}>
      <Layout gap="2" horizontalAlignment="center" orientation="vertical">
        <DocSend color="#116dff" />
        <Text type="ts" color="t60">
          TLDR
        </Text>
      </Layout>
    </Button>
  );
}

export default TLDRButton;
