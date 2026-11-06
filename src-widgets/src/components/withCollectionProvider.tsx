import React from "react";
import type { ComponentType } from "react";
import CollectionProvider from "./CollectionProvider";

export default function withCollectionProvider<P extends object>(
	ComponentToWrap: ComponentType<P>,
	context: any,
): (props: P) => React.JSX.Element {
	return function WrappedComponent(props: P): React.JSX.Element {
		return (
			<CollectionProvider context={context}>
				<ComponentToWrap {...props} />
			</CollectionProvider>
		);
	};
}
