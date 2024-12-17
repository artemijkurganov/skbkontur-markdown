import data from '@emoji-mart/data';
import EmojiPicker from '@emoji-mart/react';
import { DropdownMenu } from '@skbkontur/react-ui';
import React, { useRef } from 'react';

import { EmojiData } from './Emoji.logic';
import { EmojiPickerWrapper } from './Emoji.styled';
import { EmojiFace } from '../../MarkdownIcons/EmojiFace';
import { DEFAULT_MARKDOWN_THEME, MarkdownThemeConsumer } from '../../styles/theme';
import { MarkdownFormatButton } from '../MarkdownHelpers/MarkdownFormatButton';

interface Props {
  isPreviewMode: boolean;
  onSelect: (emoji: EmojiData) => void;
  showShortKey: boolean;
}

export const EmojiDropdown: React.FC<Props> = ({ isPreviewMode, showShortKey, onSelect }) => {
  const dropdownMenuRef = useRef<DropdownMenu>(null);

  return (
    <MarkdownThemeConsumer>
      {theme => {
        const currentTheme = theme ?? DEFAULT_MARKDOWN_THEME;

        return (
          <DropdownMenu
            ref={dropdownMenuRef}
            caption={
              <MarkdownFormatButton
                showShortKey={showShortKey}
                hintText="Emoji"
                disabled={isPreviewMode}
                icon={<EmojiFace />}
                text="Emoji"
              />
            }
          >
            <EmojiPickerWrapper>
              <EmojiPicker
                data={data}
                locale="ru"
                theme={currentTheme.themeMode}
                skinTonePosition="none"
                previewPosition="none"
                onEmojiSelect={handleSelectEmoji}
              />
            </EmojiPickerWrapper>
          </DropdownMenu>
        );
      }}
    </MarkdownThemeConsumer>
  );

  function handleSelectEmoji(data: EmojiData) {
    onSelect(data);
    dropdownMenuRef.current?.close();
  }
};
