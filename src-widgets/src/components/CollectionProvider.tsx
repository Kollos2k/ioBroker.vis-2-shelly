import { ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import React, { createContext, useMemo, type ReactNode, type Context } from "react";

const CollectionContext: Context<any> = createContext({});

interface CollectionProviderProps {
	children: ReactNode;
	context: {
		mode?: "dark" | "light" | string;
		theme?: any;
		[key: string]: any;
	};
}

function CollectionProvider({ children, context }: CollectionProviderProps): React.JSX.Element {
	const mode = context?.mode;
	const theme = context?.theme;

	const _theme = useMemo(() => {
		const mergeOptions = mode === "dark" ? { palette: { mode: "dark" } } : {};

		return createTheme(
			deepmerge(
				theme || {},
				deepmerge(mergeOptions, {
					components: {
						MuiTypography: {},
					},
				}),
			),
		);
	}, [mode, theme]);

	return (
		<ThemeProvider theme={_theme}>
			<CollectionContext.Provider value={context}>{children}</CollectionContext.Provider>
		</ThemeProvider>
	);
}

export { CollectionContext };
export default CollectionProvider;
