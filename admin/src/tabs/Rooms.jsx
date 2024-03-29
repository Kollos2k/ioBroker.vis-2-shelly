import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import {
	Typography,
	TextField,
	Checkbox,
	Select,
	MenuItem,
	FormControlLabel,
	FormControl,
	InputLabel,
	InputAdornment,
	Grid,
	Paper,
	Box,
	FormHelperText,
	IconButton,
	Tooltip,
} from "@mui/material";
import { TreeTable, I18n } from "@iobroker/adapter-react-v5";
import { Edit as EditIcon, Info as IconInfo } from "@mui/icons-material";

const styles = (theme) => ({
	tableDiv: {
		// width: "100dvw",
		// overflow: "hidden",
	},
	tableClass: {
		height: "100%",
		width: "100dvw",
		"& table": {
			minWidth: "300px !important",
		},
		"& td": { width: "30px" },
		"& thead th:nth-last-child(-n+2)": { maxWidth: "30px" },
	},
	tabContent: {},
});

class Rooms extends Component {
	constructor(props) {
		super(props);
		console.log("native");
		console.log(props.native);
		console.log(props);
		this.state = { data: props.native.rooms };
		this.columns = [
			{
				title: "RoomID",
				field: "id",
				editable: false,
				hidden: true,
				cellStyle: {
					display: "none",
				},
			},
			{
				title: I18n.t("RoomTitle"), // required, else it will be "field"
				field: "name", // required
				editable: true, // or true [default - true]
				cellStyle: {
					// 	overflow: "hidden",
					// 	wordBreak: "break-word",
					minWidth: "200px",
					maxWidth: "calc(100dvw - 50px)",
				},
				type: "string",
			},
			{
				title: I18n.t("RoomIcon"),
				field: "icon",
				editable: true,
				type: "icon",
				hidden: true,
				cellStyle: {
					display: "none",
				},
			},
		];
	}
	generateHash() {
		const length = 30;
		const allowedCharRegex = /[0-9a-z]/g;
		let curHash = "";
		while (curHash.length < length) {
			var i = Math.floor(122 * Math.random());
			if (String.fromCharCode(i).match(allowedCharRegex)) {
				curHash += String.fromCharCode(i);
			}
		}
		return curHash;
	}

	render() {
		return (
			<div className={this.props.classes.tableDiv}>
				<TreeTable
					id="roomsTable"
					name="roomsTable"
					columns={this.columns}
					data={this.state.data}
					indentation={20}
					className={this.props.classes.tableClass}
					classes={{ table: { minWidth: "100px" } }}
					glowOnChange={true}
					onUpdate={(newData, oldData) => {
						const data = JSON.parse(JSON.stringify(this.state.data));

						// Added new line
						if (newData === true) {
							let id = this.generateHash();
							// Math.random().toString(36).substr(2, 9)
							data.push({
								id,
								name: I18n.t("newRoom"),
							});
						} else {
							// existing line was modifed
							const pos = this.state.data.indexOf(oldData);
							// console.log("Data modified");
							if (pos !== -1) {
								Object.keys(newData).forEach((attr) => (data[pos][attr] = newData[attr]));
							}
						}

						// this.state.native.rooms = data;
						this.props.native.rooms = data;
						this.props.changeNative(this.props.native);
						this.setState({ data });
					}}
					onDelete={(oldData) => {
						console.log("Delete: " + JSON.stringify(oldData));
						const pos = this.state.data.indexOf(oldData);
						if (pos !== -1) {
							const data = JSON.parse(JSON.stringify(this.state.data));
							data.splice(pos, 1);
							this.props.native.rooms = data;
							this.props.changeNative(this.props.native);
							this.setState({ data });
						}
					}}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(Rooms);
