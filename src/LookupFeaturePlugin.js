import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import { CustomizationProvider } from "@twilio-paste/core/customization";
import Lookup from './components/Lookup/Lookup';
import { pasteElementHook } from './custom-css/Custom.Styles';

const PLUGIN_NAME = 'LookupFeaturePlugin';

export default class LookupFeaturePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    flex.setProviders({
      PasteThemeProvider: (props) => (
        <CustomizationProvider {...props} elements={pasteElementHook} />
      )
    });

    flex.MainHeader.Content.add(<Lookup key="lookup" />, {
      sortOrder: 0,
      align: "end"
    })
  }
}
