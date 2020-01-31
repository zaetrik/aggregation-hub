import axios from "axios";
import { useState, useReducer, useEffect, Fragment } from "react";

// Components
import Input from "./Input";
import { FaSave } from "react-icons/fa";
import Button from "./Button";

// Types
import { DataModule } from "../types/dataModule";

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

  const [routeSettings, setRouteSettings] = useState(initialRouteSettings());

  useEffect(() => {
    setRouteSettings(initialRouteSettings());
  }, [module]);

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
      <div className="form-item">
        <textarea
          onChange={e => {
            const value = e.target.value.split("\n").map(item => item.trim());
            setValue(e.target.value);
            updateRouteSettingsState(route, param, value, bodyOrQueryParam);
          }}
          placeholder="Type each new string on a new line"
          name={param}
          value={value}
        />
      </div>
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
      <div className="form-item">
        <textarea
          onChange={e => {
            setValue(e.target.value);
            const value = e.target.value.split("\n").map(item => item.trim());
            updateRouteSettingsState(route, param, value, bodyOrQueryParam);
          }}
          placeholder="Type each new number on a new line"
          name={param}
          value={value}
        />
      </div>
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
      <div className="form-item">
        <textarea
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
      </div>
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
      <div className="form-item">
        <Input
          label={description}
          //required={required}
          placeholder="Type your string"
          type="text"
          onChange={e => {
            setValue(e.target.value);
            const value = e.target.value;
            updateRouteSettingsState(route, param, value, bodyOrQueryParam);
          }}
          value={value}
        />
      </div>
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
      <div className="form-item">
        <Input
          label={description}
          //required={required}
          placeholder="Type your number"
          onChange={e => {
            setValue(e.target.value);
            const value = e.target.value;
            updateRouteSettingsState(route, param, value, bodyOrQueryParam);
          }}
          type="number"
          value={value}
        />
      </div>
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
      <div className="form-item">
        <input
          type="checkbox"
          checked={checked.value}
          name={param}
          onChange={e => {
            const value = e.target.checked;
            dispatchSetChecked({ route, param, value, bodyOrQueryParam });
          }}
        />
      </div>
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
    <Fragment>
      <div>
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
              <div key={indexRoute}>
                <h1>{module.config.routes[route].description}</h1>
                <div>
                  {formItemsBodyParams}
                  {formItemsQueryParams}
                </div>
              </div>
            );
          }
        })}
        <Button
          type="submit"
          onClick={e => submitAggregationSettings()}
          icon={<FaSave />}
          title="Save"
        />
      </div>
    </Fragment>
  );
};

export default ModuleAggregationSettings;
