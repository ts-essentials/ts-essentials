
import { Call, Fn } from '.';
import { DeepExtractorBase, DeepExtractors, ExtractorMap, GetExtractorKey } from './extractors';

type DeepIterationOverExtractors<Type, Extractors extends Fn[], DeepResolver extends DeepExtractorBase> = Extractors extends [infer FirstExtractor extends Fn, ...infer RestExtractors]
  ? Call<FirstExtractor, Type> extends infer ExtractedValues extends unknown[]
    ? GetExtractorKey<FirstExtractor> extends infer ExtractorKey extends keyof ExtractorMap
      ? Call<DeepResolver[ExtractorKey], ExtractedValues>
      : never
  : RestExtractors extends Fn[]
    ? DeepIterationOverExtractors<Type, RestExtractors, DeepResolver>
    : never
  : never;

export type DeepIteration<Type, DeepResolver extends DeepExtractorBase> = DeepIterationOverExtractors<Type, DeepExtractors, DeepResolver>;
