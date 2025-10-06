export type UnionToIntersection<Union> = (Union extends any ? (arg: Union) => void : never) extends (
  arg: infer Intersection,
) => void
  ? // Order matters here - do not swap Intersection and Union
    Intersection & Union
  : never;
