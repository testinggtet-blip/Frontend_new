import DateAndTime from '../QuestionTypes/DateAndTime';
import FreeText from '../QuestionTypes/FreeText';
import Rating from '../QuestionTypes/Rating';
import Scale from '../QuestionTypes/Scale';
import SingleSelect from '../QuestionTypes/SingleSelect';

export default function QuestionCard(props) {
  const {
    questions,
    question,
    onChangeField,
    isDefault,
    onActivate,
    onDelete,
    ...rest
  } = props;

  // Map of type -> component
  const componentMap = {
    text: FreeText,
    rating: Rating,
    scale: Scale,
    dateAndTime: DateAndTime,
    single_select: SingleSelect,
    multi_select: SingleSelect, // reuse if both are same
  };

  const SelectedComponent = componentMap[question?.type] || null;

  return (
    <div onClick={() => onActivate?.()}>
      {SelectedComponent && (
        <SelectedComponent
          question={question} // 👈 always pass question explicitly
          questions={questions}
          onChangeField={onChangeField}
          onDelete={onDelete}
          isDefault={isDefault}
          onActivate={onActivate}
          {...rest}
        />
      )}
    </div>
  );
}
