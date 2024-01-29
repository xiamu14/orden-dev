import open from "open";
/**
 * 打开后台网页执行自动更新包信息
 */

export default async function updatePackage(context: any) {
  try {
    // console.log(context)
    const { uploadQiniu, prepareEnv, variables, logger } = context;
    const { downloadUrl } = uploadQiniu;
    const { versionName, versionCode, APPLICATION_ID, ENV_TYPE } = prepareEnv;
    const { commitId } = variables;

    const href =
      ENV_TYPE === "alpha"
        ? "http://hugoadmina.yocdev.com/#/dashboard/game/list"
        : "http://hugoadmin.yocdev.com/#/dashboard/game/list";
    const common = {
      commitId: `${commitId};${versionName}`,
      packageName: APPLICATION_ID,
    };
    const data =
      ENV_TYPE === "alpha"
        ? {
            ...common,
            version: versionCode,
            downloadUrl,
          }
        : {
            ...common,
            preVersion: versionCode,
            preDownloadUrl: downloadUrl,
          };
    const searchParams = `automation=${encodeURIComponent(
      JSON.stringify({
        type: "update",
        params: data,
      })
    )}`;
    logger.info(href);
    logger.info(searchParams);
    // Specify app arguments.
    await open(`${href}?${searchParams}`, {
      app: { name: "google chrome" },
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}
