import React from 'react';

interface LoadingErrorState {
  isLoading: boolean;
  error: string | null;
}

type RenderFunction<T> = (data: T) => React.ReactNode;

export function handleLoadingAndError<T>(
  state: LoadingErrorState,
  data: T | null | undefined,
  render: RenderFunction<T>
): React.ReactNode {
  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>{state.error}</div>;
  }

  if (data === null || data === undefined) {
    return <div>Warning: No data available.</div>;
  }

  return render(data);
}
