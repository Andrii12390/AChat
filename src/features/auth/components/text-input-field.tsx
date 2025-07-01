import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  type?: string;
}

export const TextInputField = <T extends FieldValues>({ name, label, control, type }: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl className="bg-input-background">
            <Input
              {...field}
              autoComplete="off"
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
