import { SampleItemType } from "../../pages/dashboard/interface";

interface SelectedItemProps {
  selectedItemData: SampleItemType;
}

const SelectedItem : React.FC<SelectedItemProps> = ({ selectedItemData }: SelectedItemProps) => {
  return (
    <div className="details">
      <p>Id: {selectedItemData.id}</p>
      <p data-testid="titleId">Title : {selectedItemData.title}</p>
    </div>
  );
};

export default SelectedItem;
