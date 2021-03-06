import React from 'react';
import { cx } from 'emotion';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as innerClasses from './new-text.styles';

interface Props {
  handleAppendTrainerText: (trainerText: string) => void;
  className?: string;
}

export const NewTextComponent: React.FC<Props> = props => {
  const { handleAppendTrainerText, className } = props;
  const [trainerText, setTrainerText] = React.useState<string>('');

  const trainerTextRef = React.useRef<string>(trainerText);

  const handleAppendTrainerTextInternal = (): void => {
    handleAppendTrainerText(trainerTextRef.current);
    setTrainerText('');
    trainerTextRef.current = '';
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    trainerTextRef.current = e.target.value;
    setTrainerText(e.target.value);
  };

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey && Boolean(trainerTextRef.current)) {
        handleAppendTrainerTextInternal();
      }
    };
    window.addEventListener('keypress', listener);
    return () => window.removeEventListener('keypress', listener);
  }, []);

  return (
    <form className={cx(innerClasses.root, className)}>
      <label className={innerClasses.label} htmlFor="new-text">
        New text
      </label>
      <TextareaAutosize
        rowsMax={10}
        rowsMin={10}
        className={innerClasses.textarea}
        onChange={e => handleOnChange(e)}
        value={trainerText}
      />
      <Button
        variant="contained"
        color="primary"
        className={innerClasses.button}
        onClick={() => trainerText && handleAppendTrainerTextInternal()}
        disabled={!trainerText}
        aria-disabled={!trainerText}
        disableRipple={!trainerText}
        disableElevation
      >
        Send
        <ArrowForwardRoundedIcon className={innerClasses.buttonIcon} />
      </Button>
    </form>
  );
};
