import React, { useContext, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import MomentUtils from '@date-io/moment';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createTheme, jssPreset, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppContext from '../contextProvider/AppContextProvider/AppContext';

import AppLayout from '../AppLayout';
import { MuiThemeProvider } from '@material-ui/core';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const AppWrapper = ({ children }) => {
  const { theme, locale } = useContext(AppContext);

  const muiTheme = useMemo(() => {
    return createTheme(theme);
  }, [theme]);

  return (
    <IntlProvider>
      <MuiThemeProvider theme={muiTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <StylesProvider jss={jss}>
            <CssBaseline />
            <AppLayout>{children}</AppLayout>
          </StylesProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </IntlProvider>
  );
};

export default AppWrapper;
