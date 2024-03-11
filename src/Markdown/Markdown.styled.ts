import { Button, MenuItem, ThemeFactory, THEME_2022 } from '@skbkontur/react-ui';
import { CSSProperties } from 'react';

import { HorizontalPaddings, Nullable } from './types';
import styled, { css } from '../styles/styled-components';
import { MarkdownTheme } from '../styles/theme';

interface PanelProps extends HorizontalPaddings {
  theme: MarkdownTheme;
}

const panelStyle = ({ panelPadding, theme }: PanelProps) => css`
  padding: 6px ${panelPadding ?? 0}px;
  background-color: ${theme.colors.panelBg};
  margin-bottom: 12px;
`;

export const Wrapper = styled.div`
  position: relative;

  &:focus-visible {
    outline: 1px solid ${p => p.theme.colors.brand};
  }
`;

export const Avatar = styled.img.attrs({ alt: '' })`
  flex-shrink: 0;
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.colors.grayDefault};
  border-radius: 50%;
  object-fit: cover;
`;

export const UserWrapper = styled.div`
  width: 244px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DroppablePlaceholder = styled.div<HorizontalPaddings>`
  position: absolute;
  top: ${p => (p.panelPadding || p.fullscreenPadding ? 0 : -8)}px;
  left: ${p => (p.panelPadding || p.fullscreenPadding ? 0 : -8)}px;
  width: 100%;
  height: 100%;
  padding: ${p => (p.panelPadding || p.fullscreenPadding ? 0 : 8)}px;
  border-radius: 8px;
  z-index: 100;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)),
    rgba(255, 255, 255, ${p => (p.theme.themeMode === 'dark' ? 0.1 : 0.7)});
  background-image: ${p => p.theme?.droppablePlaceholderBgImage ?? ''};
`;

export const MentionWrapper = styled.div``;

export const MarkdownPreview = styled.div<HorizontalPaddings>`
  padding: 6px ${({ panelPadding, fullscreenPadding }) => fullscreenPadding ?? panelPadding ?? 8}px;
`;

export const MarkdownActionsWrapper = styled.div<{ width?: Nullable<number | string> } & HorizontalPaddings>`
  padding: ${p => (p.fullscreenPadding ? '16px' : 0)} ${p => p.fullscreenPadding ?? 0}px 0;
  margin-bottom: 4px;
  box-sizing: border-box;
  ${p => p.width && `width: ${typeof p.width === 'string' ? p.width : `${p.width}px`};`}

  ${({ theme, panelPadding, fullscreenPadding }) => {
    if (panelPadding && !fullscreenPadding) return panelStyle({ theme, panelPadding });
  }}
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 -7px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MarkdownButtonWrapper = styled(Button)`
  button {
    padding: 4px;
    border: none;
    box-sizing: border-box;
  }
`;

export const MarkdownButtonIcon = styled.div`
  height: 24px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const MarkdownDropdown = styled.div`
  button {
    font-size: ${p => p.theme.elementsFontSize};
  }
`;

export const MarkdownSymbolWrapper = styled.span`
  color: ${p => p.theme.colors.brand};
`;

export const MarkdownMenuItem = styled(MenuItem)`
  padding-left: 8px;
  padding-right: 8px;
  color: ${p => p.theme.colors.grayDefault};
`;

export const HintContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

export const MarkdownEditorBlock = styled.div`
  position: relative;
`;

export const getMarkdownMentionStyle = (x: number, y: number): CSSProperties => ({
  position: 'absolute',
  top: y,
  left: x,
});

export const UserDescriptions = styled.div`
  white-space: pre-line;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  margin-top: 4px;
`;

export const MentionMenuItem = styled(MenuItem)`
  padding: 4px 28px;
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const getMarkdownReactUiTheme = (
  theme: MarkdownTheme,
  reactUiTheme?: typeof THEME_2022,
  panelHorizontalPadding?: number,
  fullScreenTextareaPadding?: number,
  borderless?: boolean,
) => {
  const { elementsFontSize, elementsLineHeight, themeMode, colors } = theme;

  return ThemeFactory.create(
    {
      tabFontSize: elementsFontSize,
      tabPaddingY: '0',
      tabPaddingX: '6px',
      tabColorHover: 'transparent',
      tabColorFocus: 'transparent',
      tabLineHeight: elementsLineHeight,
      tabBorderWidth: '0',
      selectBorderWidth: '0',
      btnDefaultBg: 'transparent',
      btnDefaultActiveBorderColor: 'transparent',
      btnDisabledBg: 'transparent',
      btnDisabledBorderColor: 'transparent',
      btnDisabledTextColor: colors.disabledButton,
      btnDefaultHoverBg: themeMode === 'light' ? reactUiTheme?.btnDefaultHoverBg : reactUiTheme?.btnDisabledBg,
      btnFontSizeSmall: elementsFontSize,
      checkboxPaddingY: '0',
      checkboxBg: 'transparent',
      checkboxHoverBg: 'transparent',
      checkboxCheckedBg: 'transparent',
      checkboxShadow: `0 0 0 1px ${colors.grayDefault}`,
      checkboxShadowHover: `0 0 0 1px ${colors.grayDefault}`,
      checkboxCheckedHoverShadow: `0 0 0 1px ${colors.grayDefault}`,
      checkboxCheckedShadow: `0 0 0 1px ${colors.grayDefault}`,
      checkboxCheckedActiveShadow: `0 0 0 1px ${colors.grayDefault}`,
      checkboxShadowActive: `0 0 0 1px ${colors.grayDefault}`,
      checkboxCheckedColor: colors.grayDefault,
      checkboxBoxSize: elementsFontSize,
      menuItemFontSize: elementsFontSize,
      menuItemPaddingY: '4px',
      menuItemPaddingX: '28px',
      hintFontSize: elementsFontSize,
      hintColor: themeMode === 'light' ? colors.white : colors.grayDefault,
      selectPaddingXSmall: '8px',
      selectLineHeightSmall: '24px',
      dropdownBorderWidth: '0',
      ...(panelHorizontalPadding &&
        ({
          textareaPaddingX: `${panelHorizontalPadding}px`,
        } as Partial<typeof THEME_2022>)),
      ...(borderless &&
        ({
          textareaBorderColor: 'transparent',
          textareaBorderColorFocus: 'transparent',
          textareaBorderTopColor: 'transparent',
          textareaShadow: 'none',
        } as Partial<typeof THEME_2022>)),
      ...(fullScreenTextareaPadding &&
        ({
          textareaMinHeight: '85vh',
          textareaBorderColor: 'transparent',
          textareaBorderColorFocus: 'transparent',
          textareaBorderTopColor: 'transparent',
          textareaShadow: 'none',
          textareaPaddingX: `${fullScreenTextareaPadding}px`,
          textareaPaddingY: `0`,
        } as Partial<typeof THEME_2022>)),
    },
    reactUiTheme,
  );
};
