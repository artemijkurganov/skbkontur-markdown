import { Dropdown, Textarea } from '@skbkontur/react-ui';
import React, { FC, RefObject, SyntheticEvent } from 'react';

import { COMMONMARK_HELP_URL } from './constants';
import {
  ActionsWrapper,
  ButtonsWrapper,
  MarkdownDropdown,
  MarkdownMenuItem,
  MarkdownActionsWrapper,
} from './Markdown.styled';
import { MarkdownFormat } from './MarkdownFormat';
import { MarkdownCombination } from './MarkdownHelpers/MarkdownCombination';
import { MarkdownFormatButton } from './MarkdownHelpers/MarkdownFormatButton';
import { setMarkdown } from './MarkdownHelpers/markdownHelpers';
import { MarkdownButtonProps } from './MarkdownHelpers/types';
import { markdownHelpHeaders, markdownHelpLists, markdownHelpOther, markdownHelpText } from './MarkdownHelpItems';
import { HorizontalPaddings, Nullable, ViewMode } from './types';
import { AttachPaperclip } from '../MarkdownIcons/AttachPaperclip';
import { Collapse } from '../MarkdownIcons/Collapse';
import { DocIcon } from '../MarkdownIcons/DocIcon';
import { Expand } from '../MarkdownIcons/Expand';
import { EyeOpen } from '../MarkdownIcons/EyeOpen';
import { ToolPencil } from '../MarkdownIcons/ToolPencil';

interface Props {
  horizontalPaddings: HorizontalPaddings;
  onChangeViewMode: (viewMode: ViewMode) => void;
  onClickFullscreen: () => void;
  onOpenFileDialog: () => void;
  textAreaRef: RefObject<Textarea>;
  viewMode: ViewMode;
  fullscreen?: boolean;
  hasFilesApi?: boolean;
  hideHeadersSelect?: boolean;
  loadingFile?: boolean;
  selectionEnd?: Nullable<number>;
  selectionStart?: Nullable<number>;
  width?: Nullable<number | string>;
}

export const MarkdownActions: FC<Props> = ({
  textAreaRef,
  selectionStart,
  selectionEnd,
  loadingFile,
  onOpenFileDialog,
  onClickFullscreen,
  fullscreen,
  viewMode,
  onChangeViewMode,
  horizontalPaddings,
  hasFilesApi,
  hideHeadersSelect,
  width,
}) => {
  const isPreviewMode = viewMode === ViewMode.Preview;

  return (
    <MarkdownActionsWrapper {...horizontalPaddings} width={width}>
      <ButtonsWrapper>
        <ActionsWrapper>
          {hideHeadersSelect || (
            <MarkdownDropdown>
              <Dropdown disablePortal disabled={isPreviewMode} menuWidth={280} caption="Заголовок">
                {markdownHelpHeaders.map((helper, idx) => (
                  <MarkdownMenuItem
                    key={idx}
                    onClick={(event: SyntheticEvent) => handleMarkdownItemClick(event, helper.format)}
                  >
                    <MarkdownCombination format={helper.format} text={helper.node} />
                  </MarkdownMenuItem>
                ))}
              </Dropdown>
            </MarkdownDropdown>
          )}
          {markdownHelpText.map((helper, idx) => (
            <MarkdownFormatButton
              key={idx}
              disabled={isPreviewMode}
              format={helper.format}
              hintText={helper.node}
              icon={helper.icon}
              text={helper.text}
              onClick={event => handleMarkdownItemClick(event, helper.format)}
            />
          ))}
          {markdownHelpLists.map((helper, idx) => (
            <MarkdownFormatButton
              key={idx}
              disabled={isPreviewMode}
              format={helper.format}
              hintText={helper.node}
              icon={helper.icon}
              text={helper.text}
              onClick={event => handleMarkdownItemClick(event, helper.format)}
            />
          ))}
          {markdownHelpOther.map((helper, idx) => (
            <MarkdownFormatButton
              key={idx}
              disabled={isPreviewMode}
              format={helper.format}
              hintText={helper.node}
              icon={helper.icon}
              text={helper.text}
              onClick={event => handleMarkdownItemClick(event, helper.format)}
            />
          ))}
          {hasFilesApi && (
            <MarkdownFormatButton
              hintText="Прикрепить файл"
              disabled={isPreviewMode}
              isLoading={loadingFile}
              icon={<AttachPaperclip />}
              text="Прикрепить файл"
              onClick={onOpenFileDialog}
            />
          )}
          <MarkdownFormatButton
            hintText="Документация Markdown"
            icon={<DocIcon />}
            text="Документация Markdown"
            href={COMMONMARK_HELP_URL}
          />
        </ActionsWrapper>
        <ActionsWrapper>
          {renderViewModeButton()}
          <MarkdownFormatButton
            hintText={fullscreen ? 'Свернуть' : 'Развернуть'}
            icon={fullscreen ? <Collapse /> : <Expand />}
            text={fullscreen ? 'Свернуть' : 'Развернуть'}
            onClick={onClickFullscreen}
          />
        </ActionsWrapper>
      </ButtonsWrapper>
    </MarkdownActionsWrapper>
  );

  function renderViewModeButton() {
    const buttonProps: MarkdownButtonProps = {
      hintText: isPreviewMode ? 'Вернуться в редактор' : 'Превью',
      icon: isPreviewMode ? <ToolPencil /> : <EyeOpen />,
      onClick: () => onChangeViewMode(isPreviewMode ? ViewMode.Edit : ViewMode.Preview),
      text: isPreviewMode ? 'Вернуться в редактор' : 'Превью',
    };

    return <MarkdownFormatButton {...buttonProps} />;
  }

  function handleMarkdownItemClick(event: SyntheticEvent, format: MarkdownFormat) {
    if (!isNaN(Number(selectionStart)) && !isNaN(Number(selectionEnd))) {
      event.stopPropagation();
      event.preventDefault();

      if (textAreaRef?.current) {
        textAreaRef.current.focus();

        const htmlTextArea = (textAreaRef.current as any).node as HTMLTextAreaElement;

        htmlTextArea.selectionStart = Number(selectionStart);
        htmlTextArea.selectionEnd = Number(selectionEnd);

        setMarkdown(htmlTextArea, (htmlTextArea.value as string) ?? '', format, Number(selectionStart), selectionEnd);
      }
    }
  }
};
