import {
  Form,
  FormField,
  CheckBox,
  TextArea,
  Box,
  Heading,
  Button
} from "grommet";
import { DataModule } from "../types/dataModule";
import * as Icons from "grommet-icons";
import axios from "axios";
import { useState, useReducer, useEffect } from "react";

const ModuleAggregationSettings = ({ module }: { module: DataModule }) => {
  const initialRouteSettings = (): ModuleRouteSettings => {
    const routes = module.routeSettings
      ? Object.keys(module.routeSettings).map(route => {
          return {
            [route]: {
              method: module.routeSettings[route].method,
              bodyParams: module.routeSettings[route].bodyParams,
              queryParams: module.routeSettings[route].queryParams
            }
          };
        })
      : Object.keys(module.config.routes).map(route => {
          return {
            [route]: {
              method: module.config.routes[route].method,
              bodyParams: {},
              queryParams: {}
            }
          };
        });

    return Object.assign({}, ...routes);
  };

  const [routeSettings, setRouteSettings] = useState(initialRouteSettings);

  const updateRouteSettingsState = (route, param, value, bodyOrQueryParam) => {
    setRouteSettings({
      ...routeSettings,
      [route]: {
        ...routeSettings[route],
        [bodyOrQueryParam]: {
          ...routeSettings[route][bodyOrQueryParam],
          [param]: value
        }
      }
    });
  };

  const submitAggregationSettings = async () => {
    await axios.post(
      process.env.NODE_ENV === "development"
        ? `${process.env.MODULES_SERVICE_DEV}/modules/id/${module.id}/routeSettings`
        : `${process.env.MODULES_SERVICE_PROD}/modules/id/${module.id}/routeSettings`,
      { moduleRouteSettings: routeSettings }
    );
  };

  const getStringArrayFormItem = (
    route: string,
    param: string,
    required: boolean,
    description: string,
    bodyOrQueryParam: "bodyParams" | "queryParams"
  ) => {
    const currentSetting = routeSettings[route][bodyOrQueryParam][
      param
    ] as string[];
    const currentSettingTransformed = currentSetting
      ? currentSetting.map((item, index) => `${item}\n`).join("")
      : undefined;

    const [value, setValue] = useState(currentSettingTransformed);

    return (
      <FormField
        label={description}
        //required={required}
      >
        <TextArea
          onChange={e => {
            const value = e.target.value.split("\n").map(item => item.trim());
            setValue(e.target.value);
            updateRouteSettingsState(route, param, value, bodyOrQueryParam);
          }}
          placeholder="Type each new string on a new line"
          name={param}
          value={value}
        />
      </FormField>
    );
  };

  const getNumberArrayFormItem = (
    route: string,
    param: string,
    required: boolean,
    description: string,
    bodyOrQueryParam: "bodyParams" | "queryParams"
  ) => {
    const currentSetting = routeSettings[route][bodyOrQueryParam][
      param
    ] as number[];
    const currentSettingTransformed = currentSetting
      ? currentSetting.map((item, index) => `${item}\n`).join("")
      : undefined;

    const [value, setValue] = useState(currentSettingTransformed);

    return (
      <FormField
        label={description}
        //required={required}
      >
        <TextArea
          onChange={e => {
            setValue(e.target.value);
            const value = e.target.value.split("\n").map(item => item.trim());
            updateRouteSettingsState(route, param, value, bodyOrQueryParam);
          }}
          placeholder="Type each new number on a new line"
          name={param}
          value={value}
        />
      </FormField>
    );
  };

  const getBooleanArrayFormItem = (
    route: string,
    param: string,
    required: boolean,
    description: string,
    bodyOrQueryParam: "bodyParams" | "queryParams"
  ) => {
    const currentSetting = routeSettings[route][bodyOrQueryParam][
      param
    ] as boolean[];
    const currentSettingTransformed = currentSetting
      ? currentSetting.map((item, index) => `${item}\n`).join("")
      : undefined;

    const [value, setValue] = useState(currentSettingTransformed);

    return (
      <FormField
        label={description}
        //required={required}
      >
        <TextArea
          onChange={e => {
            setValue(e.target.value);
            const value = e.target.value
              .split("\n")
              .map(item => (item === "true" ? true : false));
            updateRouteSettingsState(route, param, value, bodyOrQueryParam);
          }}
          placeholder="Type each new boolean on a new line"
          name={value}
          value={currentSettingTransformed}
        />
      </FormField>
    );
  };

  const getStringFormItem = (
    route: string,
    param: string,
    required: boolean,
    description: string,
    bodyOrQueryParam: "bodyParams" | "queryParams"
  ) => {
    const currentSetting = routeSettings[route][bodyOrQueryParam][
      param
    ] as string;

    const [value, setValue] = useState(currentSetting);

    return (
      <FormField
        label={description}
        //required={required}
        placeholder="Type your string"
        type="text"
        name={param}
        onChange={e => {
          setValue(e.target.value);
          const value = e.target.value;
          updateRouteSettingsState(route, param, value, bodyOrQueryParam);
        }}
        value={value}
      />
    );
  };

  const getNumberFormItem = (
    route: string,
    param: string,
    required: boolean,
    description: string,
    bodyOrQueryParam: "bodyParams" | "queryParams"
  ) => {
    const currentSetting = routeSettings[route][bodyOrQueryParam][
      param
    ] as string;

    const [value, setValue] = useState(currentSetting);

    return (
      <FormField
        label={description}
        //required={required}
        placeholder="Type your number"
        onChange={e => {
          setValue(e.target.value);
          const value = e.target.value;
          updateRouteSettingsState(route, param, value, bodyOrQueryParam);
        }}
        validate={{
          regexp: new RegExp(/^[1-9][0-9]*$/),
          message: "Input should be a number"
        }}
        type="number"
        name={param}
        value={value}
      />
    );
  };

  const getBooleanFormItem = (
    route: string,
    param: string,
    required: boolean,
    description: string,
    bodyOrQueryParam: "bodyParams" | "queryParams"
  ) => {
    const currentSetting = routeSettings[route][bodyOrQueryParam][
      param
    ] as boolean;

    const checkedReducer = (state, action) => {
      updateRouteSettingsState(
        action.route,
        action.param,
        action.value,
        action.bodyOrQueryParam
      );
      return { initialized: true, value: action.value };
    };

    const [checked, dispatchSetChecked] = useReducer(checkedReducer, {
      initialized: false,
      value: currentSetting
    });

    useEffect(() => {
      if (!checked.initialized) {
        dispatchSetChecked({
          route,
          param,
          value: currentSetting,
          bodyOrQueryParam
        });
      }
    }, [checked]);

    return (
      <FormField //required={required}
      >
        <CheckBox
          label={description}
          checked={checked.value}
          name={param}
          onChange={e => {
            const value = e.target.checked;
            dispatchSetChecked({ route, param, value, bodyOrQueryParam });
          }}
        />
      </FormField>
    );
  };

  const getFormItem = (
    route: string,
    param: string,
    required: boolean,
    type:
      | "string[]"
      | "number[]"
      | "boolean"
      | "string"
      | "number"
      | "boolean[]",
    description: string,
    bodyOrQueryParam: "bodyParams" | "queryParams"
  ) => {
    switch (type) {
      case "string[]":
        return getStringArrayFormItem(
          route,
          param,
          required,
          description,
          bodyOrQueryParam
        );
      case "number[]":
        return getNumberArrayFormItem(
          route,
          param,
          required,
          description,
          bodyOrQueryParam
        );
      case "boolean[]":
        return getBooleanArrayFormItem(
          route,
          param,
          required,
          description,
          bodyOrQueryParam
        );
      case "string":
        return getStringFormItem(
          route,
          param,
          required,
          description,
          bodyOrQueryParam
        );
      case "number":
        return getNumberFormItem(
          route,
          param,
          required,
          description,
          bodyOrQueryParam
        );
      case "boolean":
        return getBooleanFormItem(
          route,
          param,
          required,
          description,
          bodyOrQueryParam
        );
    }
  };

  const getFormItemsForBodyParams = (body, route) => {
    return Object.keys(body).map((bodyParam, index) => {
      const type = body[bodyParam].type;
      const description = body[bodyParam].description;
      const required = body[bodyParam].required;
      return getFormItem(
        route,
        bodyParam,
        required,
        type,
        description,
        "bodyParams"
      );
    });
  };

  const getFormItemsForQueryParams = (query, route) => {
    return Object.keys(query).map((queryParam, index) => {
      const type = query[queryParam].type;
      const description = query[queryParam].description;
      const required = query[queryParam].required;
      return getFormItem(
        route,
        queryParam,
        required,
        type,
        description,
        "queryParams"
      );
    });
  };

  return (
    <Box pad="medium">
      <Form onSubmit={e => submitAggregationSettings()}>
        {Object.keys(module.config.routes).map((route, indexRoute) => {
          if (module.config.routes[route].configurable) {
            const formItemsBodyParams = getFormItemsForBodyParams(
              module.config.routes[route].body,
              route
            );
            const formItemsQueryParams = getFormItemsForQueryParams(
              module.config.routes[route].query,
              route
            );

            return (
              <Box pad="small" key={indexRoute}>
                <Heading size="xxsmall">
                  {module.config.routes[route].description}
                </Heading>
                <Box pad="small">
                  {formItemsBodyParams}
                  {formItemsQueryParams}
                </Box>
              </Box>
            );
          }
        })}
        <Button type="submit" primary label="Save" icon={<Icons.Save />} />
      </Form>
    </Box>
  );
};

export default ModuleAggregationSettings;
